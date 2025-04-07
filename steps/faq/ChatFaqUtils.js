/*****************************************************************************
 * Archivo: steps/faq/ChatFaqUtils.js
 *-----------------------------------------------------------------------------
 * Define y exporta las traducciones (FAQ) con formato enriquecido.
 *****************************************************************************/

// Importamos los datos de cada plan para incluirlos en las FAQs
const { planEsencialData } = require('../../data/planEsencialData');
const { planSoporteData } = require('../../data/planSoporteData');
const { planAseguradoData } = require('../../data/planAseguradoData');

exports.translations = {
  es: {
    faqSection: {
      mainTitle: 'Preguntas Frecuentes ❓',
      mainSubtitle:
        '_*Resuelve tus dudas sobre cómo Synara potencia la generacion de leads interesados y tus servicios.*_',
        faqs: [
        {
          question: '🧐 ¿Qué es Synara y cómo puede impulsar mi negocio?',
          answer:
            '💡 Synara es una plataforma integral que te ayuda a identificar prospectos de alto valor, *validando* sus datos y *analizando* su presencia en línea para optimizar tu estrategia de ventas.',
        },
        {
          question: '✅ ¿Cómo valida Synara los datos de contacto?',
          answer:
            '💡 Synara verifica correos electrónicos, números de WhatsApp y otros datos esenciales, garantizando la calidad y veracidad de cada lead. Esto te permite descartar rápidamente contactos irrelevantes.',
        },
        {
          question: '📝 ¿Qué análisis realiza Synara en redes sociales?',
          answer:
            '💡 Synara evalúa la presencia digital iniciando en Google Maps en donde obtenemos los primeros datos, como teléfono, url disponible, profundizamos en ella y obtenemos datos de plataformas como Facebook o Instagram, detectando oportunidades para mejorar tu alcance.',
        },
        {
          question: '👌 ¿Cómo funciona el análisis de mercado en Synara?',
          answer:
            '💡 Synara recopila y analiza las presencia digital y la url disponible y filtrando por medio de patrones muy bien definidos podemos llegar con precisión a contactos muy calificados y con asuntos pendientes de mejora a la vista. Un claro ejemplo es un restaurante con más de 1000 calificaciones en google maps y con el riesgo de perder su perfil de google my business por no haberlo reclamado aún.',
        },
        {
          question: '🚀 ¿Qué son los filtros avanzados y cómo me benefician?',
          answer:
            '💡 Puedes segmentar leads según ubicación, palabras clave y uso de WhatsApp, enfocando tus esfuerzos en prospectos de mayor potencial, que son aquellos en donde por su gran calificación, es poco probable que tengan algo sin resolver y Synara se encarga que rápidamente puedas acceder a este tipo de prospectos en donde la oportunidad es evidente. Así evitas dispersar recursos y maximizas tu tasa de conversión.',
        },
        {
          question: '💪🏻 ¿Qué tipo de soporte ofrece Synara?',
          answer:
            '💡 Apostamos en relaciones a largo plazo y brindamos todo el apoyo y soporte necesario en los primeros pasos hasta que nuestros clientes logren sus primeras ventas y puedan serguir luego por cuenta propia. Estamos abiertos a personalzar propuestas y aceptar sugerencias en modificaciones o expansiones de Synara para poder maximizar la productividad.',
        },
        // FAQs sobre Planes
        {
          question: '🚴 ¿Qué ofrece el Plan Esencial?',
          answer:
            `*${planEsencialData.title}*  🟢\n\n` +
            `💰 *Precio:* ${planEsencialData.price}\n` +
            `📈 *Leads incluidos:* ${planEsencialData.leadsInfo}\n` +
            `💵 ${planEsencialData.extra}\n\n` +
            `*Ventajas principales:*\n\n` +
            planEsencialData.features
              .map((feat, i) => `• ${feat}\n\n`)
              .join('\n'),
        },
        {
          question: '🚗 ¿Qué ofrece el Plan Soporte?',
          answer:
            `*${planSoporteData.title}*  🔵\n\n` +
            `💰 *Precio:* ${planSoporteData.price}\n` +
            `📈 *Leads y llamadas:* ${planSoporteData.leadsInfo}\n` +
             `💵 ${planSoporteData.extra}\n\n` +
            `*Ventajas principales:*\n\n` +
            planSoporteData.features
              .map((feat, i) => `• ${feat}\n\n`)
              .join('\n'),
        },
        {
          question: '✈️ ¿Qué ofrece el Plan Asegurado?',
          answer:
            `*${planAseguradoData.title}*  🔴\n\n` +
            `💰 *Precio:* ${planAseguradoData.price}\n` +
            `📈 *Leads y llamadas:* ${planAseguradoData.leadsInfo}\n` +
            `💲 ${planAseguradoData.extra}\n\n` +
            `*Ventajas principales:*\n\n` +
            planAseguradoData.features
              .map((feat, i) => `• ${feat}\n\n`)
              .join('\n'),
        },
      ],
    },
  },
};
