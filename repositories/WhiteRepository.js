/*****************************************************************************
 * Archivo: ./repositories/WhiteRepository.js
 *-----------------------------------------------------------------------------
 * Descripción:
 *  - Encapsula la lógica de acceso a la tabla "white" en MariaDB,
 *    que ahora se usa para almacenar los teléfonos a ignorar.
 *****************************************************************************/
class WhiteRepository {
  /**
   * @param {import('mysql2/promise').Pool} pool
   * @param {string} tableName - Default "white"
   * @param {string} phoneField - Default "telefono"
   */
  constructor(pool, tableName = 'white', phoneField = 'telefono') {
    this.pool = pool;
    this.tableName = tableName;
    this.phoneField = phoneField;
  }

  /**
   * Retorna true si existe el phone en la tabla "white".
   */
  async existsPhone(phone) {
    const conn = await this.pool.getConnection();
    try {
      const sql = `
        SELECT ${this.phoneField}
        FROM \`${this.tableName}\`
        WHERE ${this.phoneField} = ?
        LIMIT 1
      `;
      const [rows] = await conn.execute(sql, [phone]);
      return rows.length > 0;
    } finally {
      conn.release();
    }
  }

  /**
   * Agrega un teléfono a la tabla "white" (lista de ignorados), si no existe.
   */
  async addPhone(phone) {
    const conn = await this.pool.getConnection();
    try {
      // Usamos "INSERT IGNORE" para evitar error si ya existe.
      const sql = `
        INSERT IGNORE INTO \`${this.tableName}\` (\`${this.phoneField}\`)
        VALUES (?)
      `;
      await conn.execute(sql, [phone]);
    } finally {
      conn.release();
    }
  }
}

module.exports = { WhiteRepository };
