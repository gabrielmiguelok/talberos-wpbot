/*****************************************************************************
 * Archivo: ./services/MariaDBService.js
 *-----------------------------------------------------------------------------
 * Descripción:
 *  - Encargado de inicializar el pool de MariaDB y exponer métodos de acceso
 *    a través de repositorios.
 *  - Añade método "addPhoneToWhiteList" para insertar en la tabla "white"
 *    (que ahora se usa como lista de ignorados).
 *****************************************************************************/

require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

// Repositorios
const { MessageRepository } = require('../repositories/MessageRepository');
const { ContactRepository } = require('../repositories/ContactRepository');
const { WhiteRepository } = require('../repositories/WhiteRepository');
const { ConversationStateRepository } = require('../repositories/ConversationStateRepository');

class MariaDBService {
  constructor() {
    // Variables de entorno (cargadas desde .env.local)
    this.DB_HOST = process.env.DB_HOST;
    this.DB_USER = process.env.DB_USER;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

    this.pool = null;

    // Repos
    this.messageRepo = null;
    this.contactRepo = null;
    this.whiteRepo = null; // ahora interpretada como lista de ignorados
    this.conversationStateRepo = null;
  }

  /**
   * Conecta a la base de datos y crea los repositorios.
   */
  async connect() {
    try {
      this.pool = await mysql.createPool({
        host: this.DB_HOST,
        user: this.DB_USER,
        password: this.DB_PASSWORD,
        database: this.DB_NAME,
        port: this.DB_PORT,
        connectionLimit: 10,
      });
      console.log(`Conectado a MariaDB -> DB: ${this.DB_NAME}`);

      // Inicializar repos
      this.messageRepo = new MessageRepository(this.pool, 'messages');
      this.contactRepo = new ContactRepository(this.pool, 'contacts');
      this.whiteRepo = new WhiteRepository(this.pool, 'white', 'telefono');
      this.conversationStateRepo = new ConversationStateRepository(this.pool, 'conversation_states');
    } catch (error) {
      console.error('Falló conexión a MariaDB:', error);
      throw error;
    }
  }

  /**
   * Cierra el pool de conexiones a la DB.
   */
  async close() {
    if (this.pool) {
      try {
        await this.pool.end();
        console.log('Conexiones de MariaDB cerradas.');
      } catch (error) {
        console.error('Error al cerrar conexiones de MariaDB:', error);
      }
    }
  }

  /**
   * Registra un mensaje en la DB (tabla "messages") y, si procede,
   * crea/actualiza el contacto en la tabla "contacts".
   */
  async logMessage(phone, direction, content) {
    const type = direction === 'Enviado' ? 'sent' : 'received';
    // Insert en messages
    await this.messageRepo.insertMessage(phone, type, content);

    // Verificar si existe el contacto
    const contacto = await this.contactRepo.findByPhone(phone);
    if (!contacto) {
      // Insert nuevo
      if (type === 'received') {
        await this.contactRepo.insertNewReceived(phone);
      } else {
        await this.contactRepo.insertNewSent(phone);
      }
    } else {
      // Actualizar fecha
      if (type === 'received') {
        await this.contactRepo.updateLastReceived(phone);
      } else {
        await this.contactRepo.updateLastSent(phone);
      }
    }
  }

  /**
   * Retorna true si phone está en la lista de ignorados (tabla "white").
   */
  async estaEnWhiteList(phone) {
    return this.whiteRepo.existsPhone(phone);
  }

  /**
   * Agrega (INSERT IGNORE) un teléfono a la tabla "white" (lista de ignorados).
   */
  async addPhoneToWhiteList(phone) {
    await this.whiteRepo.addPhone(phone);
    console.log(`[INFO] Se agregó "${phone}" a la tabla 'white' (ignorados).`);
  }
}

module.exports = { MariaDBService };
