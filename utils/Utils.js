/*****************************************************************************
 * Archivo: ./utils/Utils.js
 *-----------------------------------------------------------------------------
 * Descripción:
 * Clase de utilidades generales para la aplicación. Actualmente, la principal
 * funcionalidad es formatear números de teléfono de distintos países (ej. AR/MX).
 *
 * Personalización:
 * - Puedes añadir más métodos de utilidad.
 * - Ajustar la lógica de formateo según las reglas de tu país/operadora.
 *
 *****************************************************************************/

class Utils {
  /**
   * Ajusta el número telefónico para ciertos países (Argentina/México).
   * - Argentina: si empieza con "54" pero NO con "549", se reemplaza "54" por "549".
   * - México:    si empieza con "52" pero NO con "521", se reemplaza "52" por "521".
   *
   * Ejemplo:
   *  const numeroArg = Utils.formatPhoneNumber("5412345678");
   *  // => "54912345678"
   *
   * @param {string} rawNumber - Número crudo, ej.: "541234..." o "521234..."
   * @returns {string} Número corregido para WhatsApp.
   */
  static formatPhoneNumber(rawNumber) {
    let finalNumber = (rawNumber || '').trim();

    try {
      // Argentina
      if (finalNumber.startsWith('54') && !finalNumber.startsWith('549')) {
        finalNumber = finalNumber.replace(/^54/, '549');
        console.log(`[INFO] Ajustado número argentino => ${finalNumber}`);
      }
      // México
      else if (finalNumber.startsWith('52') && !finalNumber.startsWith('521')) {
        finalNumber = finalNumber.replace(/^52/, '521');
        console.log(`[INFO] Ajustado número mexicano => ${finalNumber}`);
      }
    } catch (error) {
      console.error('Error al formatear el número telefónico:', error);
    }

    return finalNumber;
  }
}

module.exports = { Utils };
