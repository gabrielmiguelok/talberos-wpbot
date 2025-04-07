/*****************************************************************************
 * Archivo: ./repositories/ContactRepository.js
 *-----------------------------------------------------------------------------
 * Descripción:
 *  - Encapsula la lógica de acceso a la tabla "contacts" en MariaDB.
 *****************************************************************************/
class ContactRepository {
  /**
   * @param {import('mysql2/promise').Pool} pool
   * @param {string} tableName - Default "contacts"
   */
  constructor(pool, tableName = 'contacts') {
    this.pool = pool;
    this.tableName = tableName;
  }

  /**
   * Verifica si un contacto existe
   */
  async findByPhone(phone) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        SELECT phone, ref_status, last_send_update, last_received_update
        FROM \`${this.tableName}\`
        WHERE phone = ?
        LIMIT 1
      `;
      const [rows] = await conn.execute(sql, [phone]);
      return rows.length ? rows[0] : null;
    } finally {
      conn.release();
    }
  }

  /**
   * Inserta un nuevo contacto con last_received_update (mensaje entrante)
   */
  async insertNewReceived(phone) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        INSERT INTO \`${this.tableName}\`
        (phone, last_received_update, ref_status)
        VALUES (?, NOW(), 'open')
      `;
      await conn.execute(sql, [phone]);
    } finally {
      conn.release();
    }
  }

  /**
   * Inserta un nuevo contacto con last_send_update (mensaje saliente)
   */
  async insertNewSent(phone) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        INSERT INTO \`${this.tableName}\`
        (phone, last_send_update, ref_status)
        VALUES (?, NOW(), 'open')
      `;
      await conn.execute(sql, [phone]);
    } finally {
      conn.release();
    }
  }

  /**
   * Actualiza last_received_update = NOW()
   */
  async updateLastReceived(phone) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        UPDATE \`${this.tableName}\`
        SET last_received_update = NOW()
        WHERE phone = ?
      `;
      await conn.execute(sql, [phone]);
    } finally {
      conn.release();
    }
  }

  /**
   * Actualiza last_send_update = NOW()
   */
  async updateLastSent(phone) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        UPDATE \`${this.tableName}\`
        SET last_send_update = NOW()
        WHERE phone = ?
      `;
      await conn.execute(sql, [phone]);
    } finally {
      conn.release();
    }
  }

  /**
   * Actualiza ref_status
   */
  async updateRefStatus(phone, status) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        UPDATE \`${this.tableName}\`
        SET ref_status = ?
        WHERE phone = ?
      `;
      await conn.execute(sql, [status, phone]);
    } finally {
      conn.release();
    }
  }
}

module.exports = { ContactRepository };
