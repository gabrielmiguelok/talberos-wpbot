/*****************************************************************************
 * Archivo: steps/bonus/BonusSteps.js
 *-----------------------------------------------------------------------------
 * Contiene:
 *  - BONUS_MENU
 *  - BONUS_INMEDIATO
 *  - BONUS_CONTACTO
 *  - BONUS_CIERRE
 *
 * Ajustado para lucir similar al estilo de FAQ,
 * con saltos de línea, bullet points y emojis discretos.
 *****************************************************************************/
const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

// 1) SUBMENÚ PRINCIPAL DE BONUS
exports.BONUS_MENU = {
  assistantMessages: [
    '💎 *BONUS POR OBJETIVOS CUMPLIDOS* 💎\n\n' +
    'En Synara premiamos tu determinación y recompensamos el uso efectivo de la plataforma.\n\n' +
    '*Elige una opción (solo el número):*\n\n' +
    '1) *Uso inmediato de Synara*\n' +
    '2) *Contacto vía WhatsApp*\n' +
    '3) *Cierre de clientes*\n\n' +
    `4) ${BUTTON_LABELS.GO_MAIN}\n` +
    `5) ${BUTTON_LABELS.FINISH}`,
  ],
  options: [],
};

// 2) BONUS_INMEDIATO
exports.BONUS_INMEDIATO = {
  assistantMessages: [
    '⏱️ *BONUS POR USO INMEDIATO DE SYNARA*\n\n' +
    '💡 Multiplica tu saldo inicial si aprovechas rápido:\n\n' +
    '• *Usar todo tu límite en 7 días*\n\n' +
    '💎Recarga bonificada al *100%*\n\n' +
    '• *Usar el límite bonificado en 3 días*\n\n' +
    '💎Recarga adicional al *50%*\n\n' +
    '• *Usar esa segunda recarga en 1 día*\n\n' +
    '💎Bonificación nuevamente al *100%*\n\n' +
    '*¿Qué deseas hacer?*\n\n' +
    '1) _Volver al submenú de Bonus_\n' +
    '2) _Menú Principal_\n' +
    '3) _Finalizar_',
  ],
  options: [],
};

// 3) BONUS_CONTACTO
exports.BONUS_CONTACTO = {
  assistantMessages: [
    '📱 *BONUS POR CONTACTO VÍA WHATSAPP*\n\n' +
    '💡 Te premiamos por cada conversación iniciada:\n\n' +
    '• *Cada 10 conversaciones*\n\n' +
    '💎Bonificación de *$12.3 USD* en Synara\n\n' +
    '• *Al llegar a 100 conversaciones*\n\n' +
    '💎Bonificación de *$123 USD* + te agendamos una llamada con un lead calificado\n\n' +
    '*¿Qué deseas hacer?*\n\n' +
    '1) _Volver al submenú de Bonus_\n' +
    '2) _Menú Principal_\n' +
    '3) _Finalizar_',
  ],
  options: [],
};

// 4) BONUS_CIERRE
exports.BONUS_CIERRE = {
  assistantMessages: [
    '🤝 *BONUS POR CIERRE DE CLIENTES*\n\n' +
    '💡 Te reconocemos cuando concretas tus leads:\n\n' +
    '• *Al primer lead cerrado*\n\n' +
    '💎Te bonificamos la integración de Synara en un CRM a elección\n\n' +
    '• *Tercer lead cerrado*\n\n' +
    '💎Te bonificamos una integración para que envies Whatsapp desde tu CRM para agilizar la prospección\n\n' +
    '• *Quinto lead cerrado*\n\n' +
    '💎Bonificamos el desarrollo completo de un sitio web optimizado con SEO usando tecnologías como Next.js, React y Javascript\n\n' +
    '*¿Qué deseas hacer?*\n\n' +
    '1) _Volver al submenú de Bonus_\n' +
    '2) _Menú Principal_\n' +
    '3) _Finalizar_',
  ],
  options: [],
};
