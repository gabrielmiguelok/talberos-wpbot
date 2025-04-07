/*****************************************************************************
 * Archivo: ./repositories/MessageRepository.js
 *-----------------------------------------------------------------------------
 * Descripción:
 *  - Encapsula la lógica de acceso a la tabla "messages" en MariaDB.
 *****************************************************************************/
class MessageRepository {
  /**
   * @param {import('mysql2/promise').Pool} pool
   * @param {string} tableName - Nombre de la tabla "messages"
   */
  constructor(pool, tableName = 'messages') {
    this.pool = pool;
    this.tableName = tableName;
  }

  /**
   * Inserta un nuevo mensaje en la tabla "messages".
   * @param {string} phone
   * @param {'sent'|'received'} type
   * @param {string} content
   */
  async insertMessage(phone, type, content) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        INSERT INTO \`${this.tableName}\` (phone, message, type)
        VALUES (?, ?, ?)
      `;
      await conn.execute(sql, [phone, content, type]);
    } finally {
      conn.release();
    }
  }
}

module.exports = { MessageRepository };
