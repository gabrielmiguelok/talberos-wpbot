/*****************************************************************************
 * Archivo: common/FlowUtils.js
 *-----------------------------------------------------------------------------
 * Contiene la función "handleCommonActions" para acciones repetidas (Salir, FAQ, etc.).
 *****************************************************************************/

const { BUTTON_LABELS } = require('./ButtonsConfig');

/**
 * Maneja las acciones comunes como "Salir", "Finalizar", "FAQ", etc.
 * Permite evitar duplicación de lógica en distintos estados.
 *
 * @param {Object} params - Parámetros para la función
 * @param {string} params.lowerMsg - Mensaje de usuario en minúsculas
 * @param {string} params.currentState - Estado actual del flujo (no usado aquí, pero disponible)
 * @param {Function} params.setStep - Función para cambiar el estado
 * @param {Function} params.goToMenu - Función para ir al menú principal
 * @returns {boolean} Indica si se procesó alguna acción común
 */
function handleCommonActions({ lowerMsg, currentState, setStep, goToMenu }) {
  // Unifica "Salir" o "Finalizar" => van a FINAL
  if (
    lowerMsg.includes(BUTTON_LABELS.EXIT.toLowerCase()) ||
    lowerMsg.includes('salir') ||
    lowerMsg.includes(BUTTON_LABELS.FINISH.toLowerCase()) ||
    lowerMsg.includes('finalizar')
  ) {
    setStep('FINAL');
    return true;
  }

  // "Menú Principal"
  if (
    lowerMsg.includes(BUTTON_LABELS.GO_MAIN.toLowerCase()) ||
    lowerMsg.includes('menú principal') ||
    lowerMsg.includes('menu principal')
  ) {
    goToMenu();
    return true;
  }

  // "FAQ"
  if (
    lowerMsg.includes(BUTTON_LABELS.GO_FAQ.toLowerCase()) ||
    lowerMsg.includes('faq') ||
    lowerMsg.includes('preguntas')
  ) {
    setStep('FAQ_MENU');
    return true;
  }

  // "Hablar con un asesor"
  if (
    lowerMsg.includes(BUTTON_LABELS.GO_ADVISOR.toLowerCase()) ||
    lowerMsg.includes('asesor')
  ) {
    setStep('CONTACTO');
    return true;
  }

  // "Volver a planes"
  if (lowerMsg.includes(BUTTON_LABELS.GO_PLANES.toLowerCase())) {
    setStep('PLANES_MENU');
    return true;
  }

  // "Empezar de nuevo"
  if (
    lowerMsg.includes(BUTTON_LABELS.RESTART.toLowerCase()) ||
    lowerMsg.includes('empezar de nuevo')
  ) {
    setStep('MAIN');
    return true;
  }

  return false;
}

module.exports = { handleCommonActions };
