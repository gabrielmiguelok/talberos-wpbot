/*****************************************************************************
 * Archivo: ./lib/pipeline/TypingPresenceMiddleware.js
 *-----------------------------------------------------------------------------
 * Middleware que simula "escribiendo..." (composing) durante un tiempo
 * configurado (typingDelayMs) y luego envía "paused".
 *****************************************************************************/
class TypingPresenceMiddleware {
  /**
   * @param {Object|null} sock - Instancia de Baileys (o null en Mock).
   * @param {number} typingDelayMs - Tiempo en ms para simular escritura.
   */
  constructor(sock, typingDelayMs = 4000) {
    this.sock = sock;
    this.typingDelayMs = typingDelayMs;
  }

  async handle(ctx, next) {
    // Si no existe sock, podrías hacer un "console.log" para simular:
    if (!this.sock) {
      console.log(`[MOCK TYPING] Simulando typing por ${this.typingDelayMs}ms (no sock)`);
      await this._sleep(this.typingDelayMs);
      await next();
      return;
    }

    // 1) "composing"
    await this.sock.sendPresenceUpdate('composing', ctx.toNumber);

    // 2) Esperar el delay
    await this._sleep(this.typingDelayMs);

    // 3) "paused"
    await this.sock.sendPresenceUpdate('paused', ctx.toNumber);

    // Continúa con el siguiente
    await next();
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = { TypingPresenceMiddleware };
