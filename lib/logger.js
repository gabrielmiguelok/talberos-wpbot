/*****************************************************************************
 * Archivo: ./lib/logger.js
 *-----------------------------------------------------------------------------
 * Descripción:
 * Configura un logger unificado para todo el proyecto usando pino (u otra
 * librería de logging). De esta manera, todos tus servicios y módulos
 * pueden importar este "logger" en lugar de usar console.log.
 *
 * Uso:
 *   const logger = require('./lib/logger');
 *   logger.info('Hola desde X');
 *
 *****************************************************************************/

const pino = require('pino');

// Aquí puedes personalizar la configuración de pino
const logger = pino({
  transport: {
    target: 'pino-pretty', // Para imprimir en un formato legible en consola
    options: {
      colorize: true,
      translateTime: true,
    },
  },
  level: 'info', // Ajusta según tu necesidad: 'debug', 'error', 'info', etc.
});

module.exports = logger;
