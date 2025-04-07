# 🤖 Talberos WPBot

Repositorio oficial del sistema **Talberos WPBot**, un chatbot inteligente diseñado para interactuar vía **WhatsApp** mediante la librería no oficial **Baileys**, **Node.js** y **MariaDB**. Se basa en una **arquitectura modular** y en **patrones de diseño** que facilitan su expansión, incluyendo la posibilidad de integrar **servicios de Inteligencia Artificial** para validaciones, respuestas y análisis de audio.

---

## 📌 Índice

1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Características Principales](#características-principales)
4. [Arquitectura y Diseño](#arquitectura-y-diseño)
5. [Instalación y Configuración](#instalación-y-configuración)
   - [Windows](#windows)
   - [Linux](#linux)
6. [Uso del Sistema](#uso-del-sistema)
   - [Modo Real (WhatsApp)](#modo-real-whatsapp)
   - [Modo Test (Mock)](#modo-test-mock)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Expansión con IA u Otros Servicios](#expansión-con-ia-u-otros-servicios)
9. [Patrones, Principios y Buenas Prácticas](#patrones-principios-y-buenas-prácticas)
10. [Colaboración](#colaboración)
11. [Enlaces Útiles](#enlaces-útiles)
12. [Licencia](#licencia)

---

## 🚀 Introducción

**Talberos WPBot** es una solución **todo-en-uno** para administrar conversaciones de WhatsApp de manera automatizada. Basado en **Node.js** y **Baileys** (API no oficial que establece conexión vía WebSocket), este bot puede:

- Trabajar con una **base de datos MariaDB** para almacenar estados y contactos.
- Operar en **modo memoria** para propósitos de prueba o entornos simples.
- Integrarse con **Middleware** para procesar mensajes de forma flexible y escalable.

La arquitectura se centra en la claridad y la escalabilidad, lo que posibilita **agregar nuevas funcionalidades** o **modificar comportamientos** sin impacto significativo en el núcleo.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Ambiente de ejecución para JavaScript.
- **Baileys**: Conexión a WhatsApp vía WebSocket (API no oficial).
- **MariaDB**: Base de datos SQL (opcional).
- **Dotenv**: Manejo de variables de entorno.
- **Pino**: Logger para mayor trazabilidad.
- **Mock Service**: Modo de prueba sin conectarse a WhatsApp real.

---

## 💡 Características Principales

1. **Soporte de Modo Real y Modo Mock**: Podrás elegir entre conectar a WhatsApp genuino o simular interacciones en consola.
2. **Gestión de Estados Dinámicos**: Mediante flujos conversacionales que se guardan en memoria o DB.
3. **Pipeline de Middlewares**: MarkAsRead, TypingPresence, Delay, SendMessage, y la posibilidad de crear los tuyos.
4. **Configuración Sencilla**: Variables de entorno en `.env.local` y un menú interactivo para seleccionar modo de ejecución.
5. **Extensibilidad**: Nuevo middleware de IA, servicios de validación, transcripción de audios, etc.
6. **Separación de Responsabilidades**: Servicios, repositorios, pasos del chatbot y librerías claras.

---

## 🌐 Arquitectura y Diseño

El sistema aplica principios de **Clean Code** y **SOLID**:

- **SRP (Single Responsibility Principle)**: Cada archivo y clase cumple un objetivo específico.
- **OCP (Open/Closed Principle)**: Se pueden añadir middlewares o lógicas sin modificar el código base.
- **DIP (Dependency Injection Principle)**: Los servicios (DB, ChatFlow, etc.) se inyectan para un fácil reemplazo o prueba.
- **Patrón Pipeline**: Encadena middlewares que procesan el mensaje de manera secuencial.

Además:

- **Alto grado de Cohesión**: Cada módulo agrupa funcionalidad relacionada.
- **Bajo Acoplamiento**: Módulos desacoplados que se comunican mediante interfaces claras.

---

## ⚙️ Instalación y Configuración

### Windows

1. Instala **Node.js** (16+) desde [nodejs.org](https://nodejs.org/).
2. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/gabrielmiguelok/talberos-wpbot.git
   cd talberos-wpbot
   npm install
   ```
3. Renombra `.env.local.example` a `.env.local` y ajusta las variables de entorno.
4. Ejecuta `npm start`. Selecciona modo real (1) o modo mock (2).

### Linux

1. Instala **Node.js** (16+), por ejemplo con `nvm`:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   nvm install 16
   nvm use 16
   ```
2. Clona y entra en el proyecto, instala dependencias:
   ```bash
   git clone https://github.com/gabrielmiguelok/talberos-wpbot.git
   cd talberos-wpbot
   npm install
   ```
3. Crea o edita `.env.local` con tu configuración.
4. Ejecuta `npm start` y elige el modo de ejecución.

---

## 🏁 Uso del Sistema

### Modo Real (WhatsApp)

1. Al iniciar, verás un menú. Selecciona **opción 1**.
2. Aparecerá un **código QR**; escanéalo con tu WhatsApp en el teléfono.
3. Una vez conectado, cada mensaje que llegue a tu número se procesará por la lógica del bot.
4. Para finalizar, presiona `Ctrl + C` en la consola.

> **AUTO_SELECT_WHATSAPP_REAL** en `start.js` permite omitir el menú y arrancar directamente en modo real.

### Modo Test (Mock)

1. Selecciona **opción 2** en el menú.
2. Se simula un número aleatorio y podrás ingresar mensajes desde la consola.
3. El bot responderá como si fuera WhatsApp, ideal para **depurar**.
4. Finaliza con `Ctrl + C`.

---

## 📁 Estructura del Proyecto

```bash
talberos-wpbot/
├── common/           # Etiquetas de botones y funciones auxiliares
├── config/           # Variables de entorno y lógica de configuración
├── data/             # Contenido estático o semiestático (planes, FAQs)
├── lib/
│   └── pipeline/     # Middlewares (Delay, MarkAsRead, etc.)
├── repositories/     # Clases para interactuar con la BD (messages, contacts)
├── services/         # WhatsAppService, MockWhatsAppService, DBService...
├── steps/            # Flujos conversacionales (planes, bonus, FAQs...)
└── start.js          # Punto de entrada principal
```

- **services/**: Aíslan la conexión con WhatsApp (Baileys) y la capa de DB.
- **steps/**: Estados o “pasos” de la conversación; fáciles de añadir o modificar.
- **lib/pipeline/**: **Patrón de Middlewares**, cada uno con su función específica.

---

## 🧠 Expansión con IA u Otros Servicios

El sistema es altamente extensible, por ejemplo:

1. **IA para Validar Mensajes**
   Crea un *middleware* que consulte un modelo GPT para determinar si el mensaje es válido o requiere reformulación.
   ```js
   class AiValidationMiddleware {
     constructor(aiClient) {
       this.aiClient = aiClient;
     }

     async handle(ctx, next) {
       const { text } = ctx;
       const decision = await this.aiClient.validate(text);
       if (!decision.isValid) {
         ctx.text = decision.suggestedMessage;
       }
       await next();
     }
   }
   ```

2. **Transcripción de Audio**
   Usa servicios como Google Speech-to-Text o Whisper de OpenAI para convertir audios en texto. Luego, el texto se reinyecta en el flujo normal.

3. **Integraciones con CRMs**
   Podrías expandir `services/` para enviar datos de leads capturados directamente a tu CRM.

4. **Integración con ChatFlow avanzado**
   Añade lógicas condicionales, menús dinámicos, segmentación por usuario, etc.

Todo esto **sin** modificar el núcleo, solo agregando un middleware o un servicio, cumpliendo el **principio OCP** (Open/Closed).

---

## 📏 Patrones, Principios y Buenas Prácticas

- **SOLID** (SRP, OCP, LSP, ISP, DIP).
- **KISS, DRY, YAGNI**: Sin duplicaciones, solo lo necesario.
- **Patrón Pipeline**: Orquestación de Middlewares.
- **Fail Fast**: Manejo rápido y explícito de errores.
- **Encapsulación** y **bajo acoplamiento** en todos los módulos.
- **Composición sobre Herencia**.

Estas directrices garantizan que el código sea **legible**, **fácil de mantener** y preparado para futuro crecimiento.

---

## 🤝 Colaboración

1. **Fork** al repositorio.
2. Crea una rama para tus cambios: `git checkout -b feature/mi-nueva-funcionalidad`
3. Aplica tus modificaciones y confirma: `git commit -m "Descripción breve"`
4. Haz push a tu fork: `git push origin feature/mi-nueva-funcionalidad`
5. Crea un Pull Request y lo revisaremos con gusto.

¡Tu aporte es bienvenido para mejorar **Talberos WPBot**!

---

## 🔗 Enlaces Útiles

- [Repositorio oficial de Talberos WPBot](https://github.com/gabrielmiguelok/talberos-wpbot)
- [Repositorio principal Talberos](https://github.com/gabrielmiguelok/talberos)
- [Sitio oficial Talberos Tech](https://talberos.tech)

---

## 📄 Licencia

Distribuido bajo **Licencia MIT**. Consulta el archivo `LICENSE` o revisa los comentarios en el código fuente para mayor detalle.

---

> *Este proyecto utiliza **Baileys**, una API no oficial de WhatsApp. Ten en cuenta que el servicio puede variar debido a cambios en el protocolo de WhatsApp.*
>

