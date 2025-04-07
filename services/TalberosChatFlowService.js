/*****************************************************************************
 * Archivo: services/SynaraChatFlowService.js
 *-----------------------------------------------------------------------------
 * Este servicio guarda el estado de cada usuario en memoria (sin DB).
 *****************************************************************************/

const { ChatFlowManager } = require('../ChatFlowManager');

class SynaraChatFlowService {
  constructor() {
    /**
     * Diccionario: { phoneNumber: { currentState: string } }
     * para trackear en memoria el estado actual de cada conversación.
     */
    this.conversations = {};
  }

  /**
   * Procesa un mensaje entrante. Retorna un array con las respuestas del bot.
   * @param {string} phoneNumber - p.ej. '5492211234567'
   * @param {string} userMessage - Texto entrante
   * @returns {Promise<string[]>} Respuestas del asistente (array de strings)
   */
  async processIncomingMessage(phoneNumber, userMessage) {
    // 1) Obtener conversación existente o crear una nueva
    let convo = this.conversations[phoneNumber];
    if (!convo) {
      // Asignamos estado 'MAIN' para la primera interacción
      convo = { currentState: 'MAIN' };
      this.conversations[phoneNumber] = convo;
    }

    const currentState = convo.currentState;

    // 2) Llamamos a la lógica central de flujo (ChatFlowManager)
    const { newState, assistantMessages } = ChatFlowManager(currentState, userMessage);

    // 3) Actualizar el estado en memoria
    convo.currentState = newState;

    // 4) Retornar los mensajes resultantes
    return assistantMessages;
  }
}

module.exports = { SynaraChatFlowService };
