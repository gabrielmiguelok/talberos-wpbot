/*****************************************************************************
 * Archivo: steps/final/FinalSteps.js
 *-----------------------------------------------------------------------------
 * Estado FINAL para “Salir” y “Finalizar”. Licencia MIT.
 *****************************************************************************/

const { BUTTON_LABELS } = require('../../common/ButtonsConfig');

exports.FINAL = {
  assistantMessages: [
    '🎉 *_¡Muchas gracias!_* 🙌\n\n' +
      'Agradecemos tu visita y esperamos haber resuelto tus dudas.',
  ],
  options: [],
  /**
   * handler: Manejo básico (si escriben "1", reinicia).
   */
  handler: ({ lowerMsg, setStep }) => {
    if (lowerMsg === '1') {
      setStep('MAIN');
      return true;
    }
    return false;
  },
};
