/*****************************************************************************
 * Archivo: ./lib/pipeline/DelayMiddleware.js
 *-----------------------------------------------------------------------------
 * Añade una pausa adicional antes de continuar. Útil para espaciar envíos
 * o simular la demora de respuesta.
 *****************************************************************************/
class DelayMiddleware {
  constructor() {
    // Ajusta aquí el tiempo que quieras para ambos modos (Mock y Real).
    this.delayMs = 1000;
  }

  async handle(ctx, next) {
    console.log(`[DELAY MIDDLEWARE] Esperando ${this.delayMs}ms antes de continuar...`);
    await new Promise(res => setTimeout(res, this.delayMs));
    await next();
  }
}

module.exports = { DelayMiddleware };
