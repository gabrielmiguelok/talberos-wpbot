/*****************************************************************************
 * Archivo: steps/planes/PlanB.js
 *-----------------------------------------------------------------------------
 * Mensaje del "Plan Soporte" con estilo.
 *****************************************************************************/

const { BUTTON_LABELS } = require('../../common/ButtonsConfig');
const { planSoporteData } = require('../../data/planSoporteData');

exports.PLAN_B = {
  assistantMessages: [
    `*${planSoporteData.title}*  🔵\n\n` +
    `💰 *Precio:* ${planSoporteData.price}\n` +
    `📈 *Leads incluidos:* ${planSoporteData.leadsInfo}\n` +
    `💵 ${planSoporteData.extra}\n\n` +
    `*Ventajas principales:* \n\n` +
    planSoporteData.features
      .map((feat) => `• ${feat}\n`)
      .join('\n') +
    `Elige una opción:\n\n` +
    `1) ${BUTTON_LABELS.GO_PLANES}\n` +
    `2) ${BUTTON_LABELS.EXIT}`,
  ],
  options: [],
};
