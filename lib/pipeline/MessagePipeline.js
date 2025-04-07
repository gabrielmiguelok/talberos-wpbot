/*****************************************************************************
 * Archivo: ./lib/pipeline/MessagePipeline.js
 *-----------------------------------------------------------------------------
 * Orquesta (encadena) múltiples middlewares para procesar un mensaje antes
 * de enviarlo. Cada middleware implementa:
 *   async handle(ctx, next)
 * donde "ctx" contiene { toNumber, text, phone, sock, ... }
 * y "next" es una función que llama al siguiente middleware.
 *****************************************************************************/
class MessagePipeline {
  constructor(middlewares = []) {
    this.middlewares = middlewares;
  }

  /**
   * Ejecuta la cadena de middlewares en orden.
   * @param {object} ctx - Contexto con la info del mensaje
   */
  async execute(ctx) {
    const run = async (i) => {
      // Si ya no hay más middlewares, termina
      if (i >= this.middlewares.length) return;

      const middleware = this.middlewares[i];
      // "next" llama al siguiente en la cadena
      const next = async () => {
        await run(i + 1);
      };

      // Ejecutamos el middleware actual
      await middleware.handle(ctx, next);
    };

    // Iniciamos con el primer middleware
    await run(0);
  }
}

module.exports = { MessagePipeline };
