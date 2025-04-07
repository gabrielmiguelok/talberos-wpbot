/*****************************************************************************
 * Archivo: steps/faq/FaqDynamicSteps.js
 *-----------------------------------------------------------------------------
 * Genera estados dinámicos FAQ_Q0..FAQ_Qn con formato ajustado para WhatsApp.
 * Cada step resalta pregunta y respuesta con formato WhatsApp (*negrita* y _cursiva_).
 *****************************************************************************/

const { translations } = require('./ChatFaqUtils');
const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

// Extraemos el array de FAQs
const { faqs } = translations.es.faqSection;

const map = {};
faqs.forEach((faq, i) => {
  const key = `FAQ_Q${i}`;
  map[key] = {
    assistantMessages: [
      `*_${faq.question}_*\n\n${faq.answer}\n\n` +
      `1) 🔙 *Volver al Menú*\n` +
      `2) ${BUTTON_LABELS.EXIT}`,
    ],
    options: [],
  };
});

exports.dynamicFaqStates = map;
