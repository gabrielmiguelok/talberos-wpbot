/*****************************************************************************
 * Archivo: ./repositories/ConversationStateRepository.js
 *-----------------------------------------------------------------------------
 * Descripción:
 * Repositorio encargado de manejar la tabla "conversation_states" en MariaDB.
 *
 * Métodos principales:
 *   - findByPhone(phone): retorna el registro de la conversación.
 *   - upsertConversationState(phone, state, lastProcessedMsgId?): inserta o actualiza.
 *   - updateLastProcessedMessageId(phone, messageId): actualiza solo ese campo.
 *****************************************************************************/

class ConversationStateRepository {
  /**
   * @param {object} pool - Pool de conexiones mysql2/promise
   * @param {string} tableName - Nombre de la tabla (por defecto 'conversation_states')
   */
  constructor(pool, tableName = 'conversation_states') {
    this.pool = pool;
    this.tableName = tableName;
  }

  async findByPhone(phone) {
    const [rows] = await this.pool.query(
      `SELECT phone, state, updated_at, last_processed_msg_id
       FROM ${this.tableName}
       WHERE phone = ?
       LIMIT 1`,
      [phone]
    );
    return rows.length ? rows[0] : null;
  }

  async upsertConversationState(phone, state, lastProcessedMsgId = null) {
    await this.pool.query(
      `INSERT INTO ${this.tableName} (phone, state, last_processed_msg_id)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE
         state = VALUES(state),
         last_processed_msg_id = VALUES(last_processed_msg_id),
         updated_at = CURRENT_TIMESTAMP`,
      [phone, state, lastProcessedMsgId]
    );
  }

  async updateLastProcessedMessageId(phone, messageId) {
    await this.pool.query(
      `UPDATE ${this.tableName}
       SET last_processed_msg_id = ?, updated_at = CURRENT_TIMESTAMP
       WHERE phone = ?`,
      [messageId, phone]
    );
  }
}

module.exports = { ConversationStateRepository };
