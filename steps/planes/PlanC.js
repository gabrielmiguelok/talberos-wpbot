/*****************************************************************************
 * Archivo: steps/planes/PlanC.js
 *-----------------------------------------------------------------------------
 * Mensaje del "Plan Asegurado" con estilo.
 *****************************************************************************/

const { BUTTON_LABELS } = require('../../common/ButtonsConfig');
const { planAseguradoData } = require('../../data/planAseguradoData');

exports.PLAN_C = {
  assistantMessages: [
    `*${planAseguradoData.title}*  🔴\n\n` +
    `💰 *Precio:* ${planAseguradoData.price}\n` +
    `📈 *Leads incluidos:* ${planAseguradoData.leadsInfo}\n` +
    `💵 ${planAseguradoData.extra}\n\n` +
    `*Ventajas principales:* \n\n` +
    planAseguradoData.features
      .map((feat) => `• ${feat}\n`)
      .join('\n') +
    `*Elige una opción:*\n\n` +
    `1) ${BUTTON_LABELS.GO_PLANES}\n` +
    `2) ${BUTTON_LABELS.EXIT}`,
  ],
  options: [],
};
