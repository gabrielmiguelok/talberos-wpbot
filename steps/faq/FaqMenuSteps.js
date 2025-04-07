
/*****************************************************************************
 * Archivo: steps/faq/FaqMenuSteps.js
 *-----------------------------------------------------------------------------
 * Ajusta el menú enumerado con FAQs formateadas para WhatsApp.
 *****************************************************************************/

const { translations } = require('./ChatFaqUtils');
const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

const { faqSection } = translations.es;

// Construir menú enumerado con formato WhatsApp
let faqMenuText = `*${faqSection.mainTitle}* \n\n`;
faqMenuText += `${faqSection.mainSubtitle}\n\n`;
faqMenuText += 'Selecciona la pregunta que deseas resolver👇\n\n';

faqSection.faqs.forEach((faq, index) => {
  faqMenuText += `${index + 1}) *_${faq.question}_*\n\n`;
});

// Agregar opción para volver al menú principal como opción (n+1)
faqMenuText += `${faqSection.faqs.length + 1}) ${BUTTON_LABELS.GO_MAIN}\n`;

exports.FAQ_MENU = {
  assistantMessages: [faqMenuText],
  options: [],
};
