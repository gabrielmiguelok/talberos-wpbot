/*****************************************************************************
 * Archivo: steps/planes/PlansSteps.js
 *-----------------------------------------------------------------------------
 * Módulo que exporta el paso "PLANES_MENU", mostrando la lista de planes.
 *****************************************************************************/

const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

exports.PLANES_MENU = {
  assistantMessages: [
    `*Planes Disponibles* 💰\n\n` +
    `_*Tenemos 3 planes para adaptarnos a tus necesidades:*_\n\n` +
    `1) ${BUTTON_LABELS.PLAN_A}\n` +
    `2) ${BUTTON_LABELS.PLAN_B}\n` +
    `3) ${BUTTON_LABELS.PLAN_C}\n\n` +
    `4) ${BUTTON_LABELS.GO_MAIN}\n` +
    `5) ${BUTTON_LABELS.EXIT}`,
  ],
  options: [],
};
