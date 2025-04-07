/*****************************************************************************
 * Archivo: ChatFlowManager.js
 *-----------------------------------------------------------------------------
 * Lógica principal para dirigir el flujo del chatbot según el estado actual
 * y el mensaje del usuario.
 *****************************************************************************/
const { ChatSteps } = require('./steps');
const { handleCommonActions } = require('./common/FlowUtils');

function ChatFlowManager(currentState, userMessage) {
  const lowerMsg = userMessage.toLowerCase().trim();
  let newState = currentState;
  let stepData = ChatSteps.DEFAULT; // Si no coincide, se usa como fallback

  // Helper para cambiar de estado y asignar sus assistantMessages
  const setStep = (key) => {
    newState = key;
    stepData = ChatSteps[key];
  };

  // Helper para ir al Menú Principal (MAIN o MAIN_REVISITED)
  const goToMenu = () => {
    if (currentState === 'MAIN') {
      setStep('MAIN');
    } else {
      setStep('MAIN_REVISITED');
    }
  };

  // 1) Acciones comunes (Salir, Finalizar, Ir a FAQ, etc.)
  const alreadyHandled = handleCommonActions({
    lowerMsg,
    currentState,
    setStep,
    goToMenu,
  });
  if (alreadyHandled) {
    return finalizeState(newState, stepData);
  }

  // 2) Lógica particular de cada estado
  let handled = true;

  switch (currentState) {
    //----------------------------------------------------------------------
    // MAIN / MAIN_REVISITED
    //----------------------------------------------------------------------
    case 'MAIN':
    case 'MAIN_REVISITED': {
      if (lowerMsg === '1') {
        // 1 => Ir a FAQ_MENU
        setStep('FAQ_MENU');
      } else if (lowerMsg === '2') {
        // 2 => Ir a PLANES_MENU
        setStep('PLANES_MENU');
      } else if (lowerMsg === '3') {
        // 3 => Ir a BONUS_MENU
        setStep('BONUS_MENU');
      } else if (lowerMsg === '4') {
        // 4 => Ir a CONTACTO
        setStep('CONTACTO');
      } else if (lowerMsg === '5') {
        // 5 => FINAL
        setStep('FINAL');
      } else {
        // No coincide => volver a menú principal
        setStep('MAIN');
      }
      break;
    }

    //----------------------------------------------------------------------
    // BONUS_MENU
    //----------------------------------------------------------------------
    case 'BONUS_MENU': {
      if (lowerMsg === '1') {
        setStep('BONUS_INMEDIATO');
      } else if (lowerMsg === '2') {
        setStep('BONUS_CONTACTO');
      } else if (lowerMsg === '3') {
        setStep('BONUS_CIERRE');
      } else if (lowerMsg === '4') {
        // Volver a Menú Principal
        goToMenu();
      } else if (lowerMsg === '5') {
        // Salir (FINAL)
        setStep('FINAL');
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // BONUS_INMEDIATO
    //----------------------------------------------------------------------
    case 'BONUS_INMEDIATO': {
      // 1 => Regresar a BONUS_MENU
      // 2 => Menú Principal
      // 3 => FINAL
      if (lowerMsg === '1') {
        setStep('BONUS_MENU');
      } else if (lowerMsg === '2') {
        goToMenu();
      } else if (lowerMsg === '3') {
        setStep('FINAL');
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // BONUS_CONTACTO
    //----------------------------------------------------------------------
    case 'BONUS_CONTACTO': {
      if (lowerMsg === '1') {
        setStep('BONUS_MENU');
      } else if (lowerMsg === '2') {
        goToMenu();
      } else if (lowerMsg === '3') {
        setStep('FINAL');
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // BONUS_CIERRE
    //----------------------------------------------------------------------
    case 'BONUS_CIERRE': {
      if (lowerMsg === '1') {
        setStep('BONUS_MENU');
      } else if (lowerMsg === '2') {
        goToMenu();
      } else if (lowerMsg === '3') {
        setStep('FINAL');
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // PLANES_MENU
    //----------------------------------------------------------------------
    case 'PLANES_MENU': {
      // 1 => Ir a PLAN_A
      // 2 => Ir a PLAN_B
      // 3 => Ir a PLAN_C
      // 4 => Menú principal
      // 5 => Final
      if (lowerMsg === '1') {
        setStep('PLAN_A');
      } else if (lowerMsg === '2') {
        setStep('PLAN_B');
      } else if (lowerMsg === '3') {
        setStep('PLAN_C');
      } else if (lowerMsg === '4') {
        goToMenu();
      } else if (lowerMsg === '5') {
        setStep('FINAL');
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // PLAN_A, PLAN_B, PLAN_C
    //----------------------------------------------------------------------
    case 'PLAN_A':
    case 'PLAN_B':
    case 'PLAN_C': {
      // Según tus mensajes, la opción “1) Volver a planes” y “2) Salir”
      if (lowerMsg === '1') {
        setStep('PLANES_MENU');
      } else if (lowerMsg === '2') {
        setStep('FINAL');
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // FAQ_MENU
    //----------------------------------------------------------------------
    case 'FAQ_MENU': {
      // Si tienes un array "faqCount" en ChatFaqUtils,
      // convertimos a número y vemos qué hacer
      const { translations } = require('./steps/faq/ChatFaqUtils');
      const faqCount = translations.es.faqSection.faqs.length;
      const choice = parseInt(lowerMsg, 10);

      if (!isNaN(choice)) {
        // Si 1 <= choice <= faqCount => Ir a FAQ_QX
        if (choice >= 1 && choice <= faqCount) {
          setStep(`FAQ_Q${choice - 1}`);
        }
        // Si es faqCount + 1 => volver al menú principal
        else if (choice === faqCount + 1) {
          goToMenu();
        } else {
          handled = false;
        }
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // CONTACTO
    //----------------------------------------------------------------------
    case 'CONTACTO': {
      // Tu logica previa: 1 => Menú, 2 => CONTACTO_FINAL
      if (lowerMsg === '1') {
        goToMenu();
      } else if (lowerMsg === '2') {
        newState = 'CONTACTO_FINAL';
        stepData = ChatSteps.CONTACTO_FINAL;
      } else {
        handled = false;
      }
      break;
    }

    //----------------------------------------------------------------------
    // CONTACTO_FINAL (estado final, no responder más)
    //----------------------------------------------------------------------
    case 'CONTACTO_FINAL': {
      return {
        newState: 'CONTACTO_FINAL',
        assistantMessages: [],
        newOptions: [],
      };
    }

    //----------------------------------------------------------------------
    // Otros: FAQ_QX, FINAL, etc.
    //----------------------------------------------------------------------
    default: {
      // Si es un FAQ individual (FAQ_Q0, FAQ_Q1, etc.)
      if (currentState.startsWith('FAQ_Q')) {
        // 1 => Volver a FAQ_MENU
        // 2 => FINAL
        if (lowerMsg === '1') {
          setStep('FAQ_MENU');
        } else if (lowerMsg === '2') {
          setStep('FINAL');
        } else {
          handled = false;
        }
      } else {
        handled = false;
      }
      break;
    }
  }

  // 3) Si no se manejó (handled = false) y seguimos en el mismo estado => sin respuesta
  if (!handled && newState === currentState) {
    return {
      newState: currentState,
      assistantMessages: [],
      newOptions: [],
    };
  }

  // 4) Retornar el estado final y los mensajes del paso actual
  return finalizeState(newState, stepData);
}

/**
 * finalizeState: Devuelve un objeto con:
 *  - newState: el nuevo estado
 *  - assistantMessages: mensajes del chatbot
 *  - newOptions: opciones para renderizar si hiciera falta
 */
function finalizeState(newState, stepData) {
  return {
    newState,
    assistantMessages: stepData.assistantMessages,
    newOptions: stepData.options,
  };
}

module.exports = { ChatFlowManager };
