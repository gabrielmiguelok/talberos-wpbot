/*****************************************************************************
 * Archivo: steps/contact/ContactSteps.js
 *-----------------------------------------------------------------------------
 * "CONTACTO": ofrecer más información y finalización.
 *****************************************************************************/
const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

// Estado CONTACTO
exports.CONTACTO = {
  assistantMessages: [
    `🧑‍💼 *¡Perfecto!* Hemos tomado tus datos y un asesor se comunicará contigo pronto.\n\n` +
    `*Elige una opción:*\n\n` +
    `1) ${BUTTON_LABELS.GO_MAIN}\n` +
    `2) ${BUTTON_LABELS.FINISH}`,
  ],
  options: [],
};

// Estado CONTACTO_FINAL
exports.CONTACTO_FINAL = {
  assistantMessages: [
    '🙌 *Muchas gracias*. Que tengas un excelente día.',
  ],
  options: [],
};
