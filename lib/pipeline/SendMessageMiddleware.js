/*****************************************************************************
 * Archivo: ./lib/pipeline/SendMessageMiddleware.js
 *-----------------------------------------------------------------------------
 * Middleware final que realiza el envío del mensaje (real o mock).
 *
 * Principio DIP: recibimos la función final de envío por constructor,
 * en vez de acoplar toda la clase del servicio.
 *****************************************************************************/
class SendMessageMiddleware {
  /**
   * @param {function} sendImmediate - Función con firma
   *    (toNumber: string, text: string) => Promise<void>
   */
  constructor(sendImmediate) {
    this.sendImmediate = sendImmediate;
  }

  async handle(ctx, next) {
    // Envío real (o mock) del mensaje
    await this.sendImmediate(ctx.toNumber, ctx.text);

    // Si hubiera más middlewares detrás, los invocamos
    await next();
  }
}

module.exports = { SendMessageMiddleware };
