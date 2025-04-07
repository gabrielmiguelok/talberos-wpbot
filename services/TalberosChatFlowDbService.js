/*****************************************************************************
 * Archivo: services/SynaraChatFlowDbService.js
 *-----------------------------------------------------------------------------
 * Este servicio utiliza MariaDB:
 *  - Ahora la tabla "white" es la lista de contactos a ignorar.
 *  - Guarda los mensajes en la tabla "messages" y maneja "contacts".
 *  - Persiste el estado en la tabla "conversation_states".
 *****************************************************************************/

const { ChatFlowManager } = require('../ChatFlowManager');

class SynaraChatFlowDbService {
  /**
   * @param {MariaDBService} mariaDBService - Instancia que expone repos (messages, contacts, etc.)
   */
  constructor(mariaDBService) {
    this.mariaDBService = mariaDBService;
  }

  /**
   * Procesa un mensaje entrante. Retorna un array con las respuestas del bot.
   * @param {string} phoneNumber
   * @param {string} userMessage
   * @returns {Promise<string[]>} Respuestas del bot
   */
  async processIncomingMessage(phoneNumber, userMessage) {
    // 1) Verificar si está en la tabla "white" (que ahora es la lista de ignorados)
    const estaEnListaIgnorados = await this.mariaDBService.estaEnWhiteList(phoneNumber);
    if (estaEnListaIgnorados) {
      console.log(`[INFO] Teléfono ${phoneNumber} está en la lista de ignorados. Omitiendo respuesta.`);
      return [];
    }

    // 2) Registrar el mensaje entrante en la DB (messages + contacts)
    await this.mariaDBService.logMessage(phoneNumber, 'Recibido', userMessage);

    // 3) Revisar el estado actual en conversation_states
    let convo = await this.mariaDBService.conversationStateRepo.findByPhone(phoneNumber);
    let currentState = convo ? convo.state : 'MAIN'; // si no existe, arranca 'MAIN'

    // 4) Llamar a la lógica de flujo principal
    const { newState, assistantMessages } = ChatFlowManager(currentState, userMessage);

    // 5) Actualizar la tabla conversation_states con el nuevo estado
    await this.mariaDBService.conversationStateRepo.upsertConversationState(phoneNumber, newState);

    // 6) Registrar los mensajes salientes en la DB
    for (const reply of assistantMessages) {
      await this.mariaDBService.logMessage(phoneNumber, 'Enviado', reply);
    }

    // 7) Devolver el array de respuestas para que WhatsAppService las envíe
    return assistantMessages;
  }
}

module.exports = { SynaraChatFlowDbService };
