/*****************************************************************************
 * Archivo: steps/menu/MenuRevisitedSteps.js
 *****************************************************************************/
const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

exports.MAIN_REVISITED = {
  assistantMessages: [
    '🔄 *Volvemos al menú principal*:\n\n' +
      `1) ${BUTTON_LABELS.GO_FAQ}\n` +
      `2) ${BUTTON_LABELS.VER_PLANES}\n` +
      `3) ${BUTTON_LABELS.VER_BONUS}\n` +
      `4) ${BUTTON_LABELS.GO_ADVISOR}\n` +
      `5) ${BUTTON_LABELS.EXIT}\n`,
  ],
  options: [],
};
