/*****************************************************************************
 * Archivo: ./lib/pipeline/MarkAsReadMiddleware.js
 *-----------------------------------------------------------------------------
 * Marca como "leído" el último mensaje no leído del contacto (si existe).
 *****************************************************************************/
class MarkAsReadMiddleware {
  /**
   * @param {Object} lastIncomingMessageKey - phone -> msg.key
   * @param {Object|null} sock - Instancia de Baileys (o null en mock).
   */
  constructor(lastIncomingMessageKey, sock) {
    this.lastIncomingMessageKey = lastIncomingMessageKey;
    this.sock = sock;
  }

  async handle(ctx, next) {
    const key = this.lastIncomingMessageKey[ctx.phone];
    if (key && this.sock) {
      try {
        await this.sock.readMessages([key]);
        console.log(`Marcado como leído el último mensaje de ${ctx.phone}`);
      } catch (err) {
        console.error(`[ERROR] No se pudo marcar como leído el mensaje de ${ctx.phone}:`, err);
      }
    }
    await next();
  }
}

module.exports = { MarkAsReadMiddleware };
