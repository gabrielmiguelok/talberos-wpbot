/*****************************************************************************
 * Archivo: services/MockWhatsAppService.js
 *****************************************************************************/
const { MessagePipeline } = require('../lib/pipeline/MessagePipeline');
const { SendMessageMiddleware } = require('../lib/pipeline/SendMessageMiddleware');
const { DelayMiddleware } = require('../lib/pipeline/DelayMiddleware');

class MockMarkAsReadMiddleware {
  async handle(ctx, next) {
    console.log(`[MOCK] MarkAsRead: Mensaje de ${ctx.phone} marcado como leído (simulado).`);
    await next();
  }
}

class MockWhatsAppService {
  constructor() {
    this.chatFlowService = null;

    this.messagePipeline = new MessagePipeline([
      new MockMarkAsReadMiddleware(),
      new DelayMiddleware(),
      new SendMessageMiddleware(this._sendMessageImmediate.bind(this)),
    ]);
  }

  setChatFlowService(service) {
    this.chatFlowService = service;
  }

  async simulateIncomingMessage(phoneNumber, text) {
    console.log(`\n[MOCK] => Mensaje de ${phoneNumber}: "${text}"`);
    if (!this.chatFlowService) return;

    try {
      const assistantReplies = await this.chatFlowService.processIncomingMessage(phoneNumber, text);

      for (const reply of assistantReplies) {
        const ctx = {
          phone: phoneNumber,
          toNumber: phoneNumber,
          text: reply,
        };
        await this.messagePipeline.execute(ctx);
      }
    } catch (error) {
      console.error('[MOCK] Error en simulateIncomingMessage:', error);
    }
  }

  async _sendMessageImmediate(toNumber, text) {
    console.log(`[MOCK] <= Bot responde a ${toNumber}: "${text}"`);
  }
}

module.exports = { MockWhatsAppService };
