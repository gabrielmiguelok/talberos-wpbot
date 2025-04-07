/*****************************************************************************
 * Archivo: steps/index.js
 *****************************************************************************/
const { MAIN } = require('./menu/MainSteps');
const { MAIN_REVISITED } = require('./menu/MenuRevisitedSteps');
const { PLANES_MENU } = require('./planes/PlansSteps');
const { PLAN_A } = require('./planes/PlanA');
const { PLAN_B } = require('./planes/PlanB');
const { PLAN_C } = require('./planes/PlanC');
const { FAQ_MENU } = require('./faq/FaqMenuSteps');
const { dynamicFaqStates } = require('./faq/FaqDynamicSteps');
const { CONTACTO, CONTACTO_FINAL } = require('./contact/ContactSteps');
const { FINAL } = require('./final/FinalSteps');
const { DEFAULT } = require('./default/DefaultSteps');

// NUEVO: importamos los estados de Bonus
const {
  BONUS_MENU,
  BONUS_INMEDIATO,
  BONUS_CONTACTO,
  BONUS_CIERRE,
} = require('./bonus/BonusSteps');

// Exportamos todos
exports.ChatSteps = {
  MAIN,
  MAIN_REVISITED,
  PLANES_MENU,
  PLAN_A,
  PLAN_B,
  PLAN_C,
  FAQ_MENU,
  ...dynamicFaqStates,
  CONTACTO,
  CONTACTO_FINAL,
  FINAL,
  DEFAULT,

  // Bonus
  BONUS_MENU,
  BONUS_INMEDIATO,
  BONUS_CONTACTO,
  BONUS_CIERRE,
};
