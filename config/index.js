/*****************************************************************************
 * Archivo: ./config/index.js
 *-----------------------------------------------------------------------------
 * Descripción:
 * Carga y centraliza la configuración de la app (variables de entorno,
 * constantes predeterminadas, validaciones, etc.).
 *
 * Se recomienda usar dotenv para cargar un archivo .env (ya lo haces en star.js,
 * pero también podrías hacerlo aquí). Posteriormente, se exporta un objeto
 * CONFIG con todo lo que necesita el resto de la app.
 *
 * Uso:
 *   const { CONFIG } = require('../config');
 *   console.log(CONFIG.DB_HOST);
 *
 *****************************************************************************/

require('dotenv').config({ path: '.env.local' });

// Función opcional para validar que no falte algo crítico
function checkEnvVar(name) {
  if (!process.env[name]) {
    console.warn(`[WARN] Variable de entorno ${name} no está definida. Verifica tu .env.local`);
    // throw new Error(`La variable de entorno ${name} es requerida`); // si quisieras forzar
  }
}

// Ejemplo: checkEnvVar('DB_HOST');

const CONFIG = {
  // Nombre de la sesión de WhatsApp. Se puede pasar como argumento de la CLI.
  SESSION_NAME: process.argv[2] || 'mi-sesion',

  // Configuración de MariaDB
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'gestionwp',
  DB_PORT: Number(process.env.DB_PORT) || 3306,

  // Intervalo para envíos masivos (en milisegundos)
  INTERVALO_ENVIO_MS: Number(process.env.INTERVALO_ENVIO_MS) || 2 * 60 * 1000, // Ej: 2 minutos
};

module.exports = { CONFIG };
