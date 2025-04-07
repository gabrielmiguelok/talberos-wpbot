/*****************************************************************************
 * Archivo: steps/planes/PlanA.js
 *-----------------------------------------------------------------------------
 * Mensaje del "Plan Esencial" con un estilo más visual.
 *****************************************************************************/

const { BUTTON_LABELS } = require('../../common/ButtonsConfig');
const { planEsencialData } = require('../../data/planEsencialData');

exports.PLAN_A = {
  assistantMessages: [
    `*${planEsencialData.title}*  🟢\n\n` +
    `💰 *Precio:* ${planEsencialData.price}\n` +
    `📈 *Leads incluidos:* ${planEsencialData.leadsInfo}\n` +
    `💵 ${planEsencialData.extra}\n\n` +
    `*Ventajas principales:* \n\n` +
    planEsencialData.features
      .map((feat) => `• ${feat}\n`)
      .join('\n') +
    `  *Elige una opción:*\n\n` +
    `1) ${BUTTON_LABELS.GO_PLANES}\n` +
    `2) ${BUTTON_LABELS.EXIT}`,
  ],
  options: [],
};
