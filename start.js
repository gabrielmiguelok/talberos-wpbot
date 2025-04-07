/*****************************************************************************
 * Archivo: start.js
 *****************************************************************************/
const readline = require('readline');
const { WhatsAppService } = require('./services/WhatsAppService');
const { MockWhatsAppService } = require('./services/MockWhatsAppService');

// ChatFlows
const { SynaraChatFlowService } = require('./services/TalberosChatFlowService');
const { SynaraChatFlowDbService } = require('./services/TalberosChatFlowDbService');

// Servicios de DB
const { MariaDBService } = require('./services/MariaDBService');

// ********************************
// CAMBIA ESTAS CONSTANTES A true O false SEGÚN NECESITES
// ********************************
const USE_MARIADB = false;
// Si AUTO_SELECT_WHATSAPP_REAL es true, se iniciará automáticamente en modo WhatsApp real (opción 1)
// sin solicitar interacción.
const AUTO_SELECT_WHATSAPP_REAL = false;

(async function main() {
  console.clear();

  if (AUTO_SELECT_WHATSAPP_REAL) {
    // Inicia automáticamente en modo WhatsApp real (opción 1)
    await runWhatsAppRealFlow();
  } else {
    // Menú interactivo para seleccionar el modo de ejecución
    console.log('========================================');
    console.log(' SELECCIONA UN MODO DE EJECUCIÓN (Talberos)');
    console.log('========================================');
    console.log('1) Iniciar con WhatsApp real (Baileys)');
    console.log('2) Testear chatbot en modo mock (consola)\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Elige [1 o 2]: ', async (answer) => {
      rl.close();
      const opt = answer.trim();

      if (opt === '1') {
        // Opción 1: WhatsApp real
        await runWhatsAppRealFlow();
      } else if (opt === '2') {
        // Opción 2: Test con mock
        await runTestModeFlow();
      } else {
        console.log('Opción no reconocida. Saliendo...');
        process.exit(0);
      }
    });
  }
})();

/**
 * Flujo REAL: se conecta a WhatsApp con Baileys
 */
async function runWhatsAppRealFlow() {
  try {
    // 1) Instanciamos el servicio de WhatsApp (Baileys).
    const whatsAppService = new WhatsAppService('Talberos-ChatBot');

    // 2) Elegimos si conectarnos a MariaDB o usar el flujo en memoria
    let chatFlowService;
    if (USE_MARIADB) {
      const mariaDBService = new MariaDBService();
      await mariaDBService.connect();

      chatFlowService = new SynaraChatFlowDbService(mariaDBService);
      console.log('[OK] ChatFlow con MariaDB activo.');
    } else {
      chatFlowService = new SynaraChatFlowService();
      console.log('[OK] ChatFlow en modo memoria (sin DB).');
    }

    // 3) Vincular
    whatsAppService.setChatFlowService(chatFlowService);

    // 4) Inicializar WhatsApp
    await whatsAppService.initialize();
    console.log('[OK] Servicio de WhatsApp inicializado (modo REAL).');
    console.log('[INFO] Escanea el QR si te lo muestra y presiona Ctrl+C para salir.');
  } catch (error) {
    console.error('Error en modo REAL:', error);
    process.exit(1);
  }
}

/**
 * Flujo TEST: modo mock en consola.
 */
async function runTestModeFlow() {
  console.log('=== MODO TEST: Chatbot con MockWhatsAppService ===');
  console.log('Escribe mensajes en consola para simular al usuario.');
  console.log('Presiona Ctrl+C para salir.\n');

  // 1. Instanciamos el servicio mock
  const mockWS = new MockWhatsAppService();

  // 2. Elegimos si conectarnos a MariaDB o usar el flujo en memoria
  let chatFlowService;
  let mariaDBService;
  if (USE_MARIADB) {
    mariaDBService = new MariaDBService();
    await mariaDBService.connect();
    chatFlowService = new SynaraChatFlowDbService(mariaDBService);
    console.log('[OK] ChatFlow con MariaDB activo (modo MOCK).');
  } else {
    chatFlowService = new SynaraChatFlowService();
    console.log('[OK] ChatFlow en modo memoria (sin DB).');
  }

  // 3. Vincular el servicio (db o memoria) al mock
  mockWS.setChatFlowService(chatFlowService);

  // 4. Generar un número "aleatorio" y, si hay DB, agregarlo a la tabla "white" (ahora lista de ignorados)
  const phoneNumber = generateRandomPhoneNumber();
  if (USE_MARIADB) {
    await mariaDBService.addPhoneToWhiteList(phoneNumber);
    console.log(`[INFO] Se agregó ${phoneNumber} a la lista de ignorados.`);
  }

  // 5. Simular un mensaje inicial "Hola"
  await mockWS.simulateIncomingMessage(phoneNumber, 'Hola');

  // 6. Lectura de consola en loop
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (line) => {
    const input = line.trim();
    if (!input) return;
    await mockWS.simulateIncomingMessage(phoneNumber, input);
  });

  // 7. Manejo Ctrl+C
  process.on('SIGINT', async () => {
    console.log('\n[SALIDA TEST] Terminando...');
    if (USE_MARIADB && mariaDBService) {
      await mariaDBService.close();
    }
    rl.close();
    process.exit(0);
  });
}

/**
 * Genera un teléfono "aleatorio" muy básico simulando algo tipo "549221xxxxx".
 */
function generateRandomPhoneNumber() {
  const random6Digits = Math.floor(100000 + Math.random() * 900000);
  return '549221' + random6Digits;
}

