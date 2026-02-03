## Gestión de Tareas
- **Sistemas de tareas:** Todas las tareas se gestionan en **Notion Y ClickUp** (ambos sistemas en paralelo)
- **Base de datos Notion:** "Seguimiento de tareas" (https://www.notion.so/1c2e88ee9bde80c4aa11f50a91f3a858)
- **ClickUp:** Carpeta "Desarrollos" > Lista "List" (ID: 901325027947)
- **Responsable principal:** Gabriel Duarte
  - Notion ID: 1bdd872b-594c-81f7-9e75-000297f4be7a
  - ClickUp ID: 112072972 (email: programacion@nordvitalips.com)
- **Cuando el usuario mencione "tareas":** Preguntar si desea crear en Notion, ClickUp o AMBOS
- **Convención de nombres:** El título de la tarea debe incluir un prefijo según el tipo:
  - `feat:` para Feature
  - `fix:` para Bug
  - `refactor:` para Refactor
  - `maintenance:` para Maintenance
  - `document:` para Documentation
  - Ejemplo: "refactor: mejorar lógica de autenticación"

### Estructura de Tareas (Sintaxis unificada Notion/ClickUp)

#### **Campos obligatorios:**
- **Nombre de tarea:** Título con prefijo según tipo (feat:, fix:, refactor:, etc.)
- **Descripción:** Descripción detallada de la tarea
- **Estado:** 
  - Notion: Sin empezar | En curso | Retrasada | Listo
  - ClickUp: EN ESPERA | PENDIENTE | EN PROCESO | COMPLETADO | EN REVISION | ACEPTADO
- **Prioridad:**
  - Notion: Alta | Media | Baja
  - ClickUp: Baja | Normal | Alta | Urgente
- **Responsable:** Gabriel Duarte (por defecto)
- **Fecha límite:** Fecha en formato YYYY-MM-DD

#### **Campos opcionales:**
- **Tiempo Estimado:** Duración en horas
- **Tags/Etiquetas:** Tags relevantes para la tarea
- **Fecha de inicio:** Fecha en formato YYYY-MM-DD

#### **Campos específicos de Notion (no en ClickUp):**
- **Nivel de esfuerzo:** Pequeño | Media | Grande
- **Tipo Tarea:** Feature | Bug | Refactor | Maintenance | Documentation
- **Módulo:** Backend | Frontend | database | servidor (multi-select)

### Separación de Tareas
- **Principio de Responsabilidad Única:** Cada tarea debe tener UN solo propósito claro
- **Cuándo separar en múltiples tareas:**
  - Cuando los cambios combinan diferentes tipos (ej: fix + refactor)
  - Cuando afectan diferentes capas o módulos independientes (ej: frontend + backend)
  - Cuando una parte puede completarse independientemente de la otra
  - Cuando el tiempo estimado total supera las 2 horas
  - Cuando los cambios tienen diferentes niveles de prioridad
- **Criterios de separación:**
  - **fix + refactor:** SIEMPRE separar. El fix soluciona un problema, el refactor mejora el código
  - **feat + refactor:** Separar si el refactor no es esencial para la feature
  - **múltiples features:** Separar cada feature en su propia tarea
  - **cambios en múltiples módulos:** Separar por módulo si son independientes
- **Ejemplo de separación correcta:**
  - ❌ MAL: "fix: mejorar visualización de títulos y refactorizar modelo de datos"
  - ✅ BIEN: 
    - Tarea 1: "fix: mejorar visualización de títulos largos en tarjetas"
    - Tarea 2: "refactor: migrar nomenclatura del modelo a inglés"
- **Acción al detectar múltiples responsabilidades:** 
  - Analizar los cambios realizados con get_changed_files
  - Identificar diferentes tipos de cambios (fix, refactor, feat)
  - Crear una tarea separada para cada tipo de cambio
  - Documentar claramente qué archivos y cambios corresponden a cada tarea
  - Mantener tareas enfocadas y con estimaciones realistas (< 2 horas cada una)