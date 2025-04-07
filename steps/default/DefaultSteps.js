/*****************************************************************************
 * Archivo: steps/default/DefaultSteps.js
 *-----------------------------------------------------------------------------
 * Muestra un mensaje cuando no se entiende la entrada del usuario (licencia MIT).
 *****************************************************************************/

const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

exports.DEFAULT = {
  assistantMessages: [
    '⚠️ *No entendimos tu opción.*\n' +
      'Escribe solo el número de la opción que buscas.\n\n' +
      `1) ${BUTTON_LABELS.GO_MAIN}\n` +
      `2) ${BUTTON_LABELS.FINISH}`,
  ],
  options: [],
  /**
   * handler: al llegar aquí, la próxima interacción se maneja en ChatFlowManager.
   * Retornamos false para indicar que no se resuelve aquí.
   */
  handler: () => false,
};
