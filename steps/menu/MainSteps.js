/*****************************************************************************
 * Archivo: steps/menu/MainSteps.js
 *****************************************************************************/
const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

exports.MAIN = {
  assistantMessages: [
    '🙋‍♂️ *¡Hola! Soy Synara* 🤖\n\n' +
      'Te ayudo a conseguir *leads calificados* y mejores resultados.\n\n' +
      '*¿Qué deseas hacer?* Elige contestando con un número:\n\n' +
      `1) ${BUTTON_LABELS.GO_FAQ}\n` +
      `2) ${BUTTON_LABELS.VER_PLANES}\n` +
      // Bonus pasa a la opción 3
      `3) ${BUTTON_LABELS.VER_BONUS}\n` +
      `4) ${BUTTON_LABELS.GO_ADVISOR}\n` +
      `5) ${BUTTON_LABELS.EXIT}`,
  ],
  options: [],
};
