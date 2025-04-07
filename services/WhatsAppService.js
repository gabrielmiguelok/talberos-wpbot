/*****************************************************************************
 * Archivo: services/WhatsAppService.js
 *-----------------------------------------------------------------------------
 * - Conexión real a WhatsApp con Baileys.
 * - Integra la MessagePipeline con varios middlewares:
 *     1) MarkAsReadMiddleware
 *     2) TypingPresenceMiddleware
 *     3) DelayMiddleware
 *     4) SendMessageMiddleware
 *
 * Principios aplicados:
 * - DIP: inyectamos la función de envío real en SendMessageMiddleware.
 * - SRP: cada middleware tiene su tarea específica (marcar leído, simular typing, etc.).
 * - SoC: separa la lógica de conexión Baileys del pipeline.
 *****************************************************************************/

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');

// Pipeline / Middlewares
const { MessagePipeline } = require('../lib/pipeline/MessagePipeline');
const { SendMessageMiddleware } = require('../lib/pipeline/SendMessageMiddleware');
const { TypingPresenceMiddleware } = require('../lib/pipeline/TypingPresenceMiddleware');
const { DelayMiddleware } = require('../lib/pipeline/DelayMiddleware');
const { MarkAsReadMiddleware } = require('../lib/pipeline/MarkAsReadMiddleware');

class WhatsAppService {
  /**
   * @param {string} sessionName - Nombre de la sesión de WhatsApp (identificador).
   */
  constructor(sessionName) {
    this.sessionName = sessionName;
    this.sock = null;
    this.chatFlowService = null;
    this.authFolder = path.join(__dirname, '../auth', this.sessionName);
    this.connected = false;
    this.processedMessageIds = new Set();

    // Diccionario phone -> última key de msg para luego marcar como leído
    this.lastIncomingMessageKey = {};

    // 1) Definimos la pipeline con los middlewares deseados:
    //    (a) MarkAsRead -> marca como leído el último mensaje
    //    (b) TypingPresence -> simula "escribiendo" (2s)
    //    (c) Delay -> retardo adicional (3s, definido en DelayMiddleware)
    //    (d) SendMessage -> envío real con Baileys
    this.messagePipeline = new MessagePipeline([
      new MarkAsReadMiddleware(this.lastIncomingMessageKey, null /* sock se inyectará luego */),
      new TypingPresenceMiddleware(null /* sock se inyectará luego */, 2000),
      new DelayMiddleware(), // delayMs definido dentro de DelayMiddleware.js
      new SendMessageMiddleware(this._sendMessageImmediate.bind(this)),
    ]);
  }

  /**
   * Asocia la lógica del chatbot (SynaraChatFlowService).
   * @param {Object} chatFlowService - Lógica que maneja el estado del chat.
   */
  setChatFlowService(chatFlowService) {
    this.chatFlowService = chatFlowService;
  }

  /**
   * Inicializa la conexión con Baileys (muestra QR si no hay credenciales).
   */
  async initialize() {
    if (!fs.existsSync(this.authFolder)) {
      fs.mkdirSync(this.authFolder, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(this.authFolder);

    this.sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'error' }),
      printQRInTerminal: false,
    });

    this._setupConnectionListeners(saveCreds);
    this._setupMessageListener();
  }

  /**
   * Envía un texto al usuario usando la pipeline.
   * @param {string} phone - Número de teléfono ej. '5492211234567'
   * @param {string} text - Mensaje a enviar
   */
  async sendMessage(phone, text) {
    if (!this.sock) {
      throw new Error('Socket de WhatsApp no inicializado.');
    }

    // Arma el JID de WhatsApp
    const jid = `${phone}@s.whatsapp.net`;

    // 1) Contexto que se pasará a cada middleware
    const ctx = {
      phone,        // '5492211234567'
      toNumber: jid,
      text,
      sock: this.sock,
    };

    // 2) Ajustamos el sock en los middlewares que lo requieran
    const [markAsReadMw, typingMw] = this.messagePipeline.middlewares;
    if (markAsReadMw instanceof MarkAsReadMiddleware) {
      markAsReadMw.sock = this.sock;
    }
    if (typingMw instanceof TypingPresenceMiddleware) {
      typingMw.sock = this.sock;
    }

    // 3) Ejecutamos la pipeline
    await this.messagePipeline.execute(ctx);
  }

  /**
   * Función real de envío (llamada por SendMessageMiddleware al final).
   * @param {string} toNumber - JID ej. '5492211234567@s.whatsapp.net'
   * @param {string} text - Texto a enviar
   */
  async _sendMessageImmediate(toNumber, text) {
    await this.sock.sendMessage(toNumber, { text });
    console.log(`Mensaje enviado a ${toNumber}: "${text}"`);
  }

  /**
   * Configura listeners de conexión (QR, reconexión, etc.).
   * @param {Function} saveCreds - función que guarda credenciales
   */
  _setupConnectionListeners(saveCreds) {
    this.sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Si hay QR, limpiamos consola y mostramos en terminal
      if (qr) {
        console.clear();
        console.log(`\n[Sesión: ${this.sessionName}] Escanea este código QR:\n`);
        qrcode.generate(qr, { small: true });
      }

      // Manejo de la desconexión
      if (connection === 'close') {
        const isBoom = lastDisconnect?.error instanceof Boom;
        const reasonCode = isBoom ? lastDisconnect.error.output?.statusCode : 0;
        const shouldReconnect = reasonCode !== DisconnectReason.loggedOut;

        console.error(`[WARN] Conexión cerrada. Reconectar: ${shouldReconnect}`);
        if (shouldReconnect) {
          setTimeout(() => this.initialize(), 5000);
        } else {
          console.log('[INFO] Sesión cerrada definitivamente.');
        }
      }
      // Conexión exitosa
      else if (connection === 'open') {
        this.connected = true;
        console.log(`Sesión WhatsApp "${this.sessionName}" conectada.`);
      }
    });

    // Guardar credenciales en cada actualización
    this.sock.ev.on('creds.update', saveCreds);
  }

  /**
   * Configura el listener para mensajes entrantes.
   * Llama a `chatFlowService` para obtener respuestas, luego
   * usa `sendMessage` para responder.
   */
  _setupMessageListener() {
    this.sock.ev.on('messages.upsert', async (msgBatch) => {
      // Solo nos interesa "notify"
      if (msgBatch.type !== 'notify') return;

      for (const msg of msgBatch.messages) {
        if (!msg.message) continue;
        // Ignoramos mensajes que enviamos nosotros
        if (msg.key.fromMe) continue;

        const senderJid = msg.key.remoteJid || '';
        if (!senderJid.endsWith('@s.whatsapp.net')) continue;

        const phone = senderJid.split('@')[0];
        const textMsg =
          msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          msg.message.imageMessage?.caption ||
          msg.message.videoMessage?.caption ||
          '';

        const cleanText = textMsg.trim();
        if (!cleanText) continue;

        // Evitamos reprocesar el mismo mensaje
        const messageId = msg.key.id || 'unknown-id';
        if (this.processedMessageIds.has(messageId)) {
          continue;
        }
        this.processedMessageIds.add(messageId);

        // Guardamos la key para MarkAsReadMiddleware
        this.lastIncomingMessageKey[phone] = msg.key;

        // Pasamos el texto al chatFlowService para obtener la respuesta
        if (this.chatFlowService) {
          try {
            const assistantReplies = await this.chatFlowService.processIncomingMessage(phone, cleanText);

            // Enviamos cada respuesta usando el pipeline
            for (const reply of assistantReplies) {
              await this.sendMessage(phone, reply);
            }
          } catch (error) {
            console.error('[ERROR] al procesar mensaje:', error);
          }
        }
      }
    });
  }
}

module.exports = { WhatsAppService };
