---
title: "Pliegos"
slug: "pliegos"
tagline: "Inteligencia de contratación pública sobre SECOP II con sincronización incremental, búsqueda híbrida y recomendaciones explicables."
status: "backend-development"
problem: "Monitorear miles de convocatorias en SECOP II a mano es un trabajo repetitivo y propenso a errores: formatos inconsistentes, datos faltantes y riesgo continuo de perder oportunidades comerciales o cambios de plazo."
solution: "Sistema inteligente que actúa como un analista en segundo plano: sincroniza procesos de SECOP II de forma incremental, descarta lo no licitable, combina búsqueda semántica con texto completo y puntúa oportunidades con factores transparentes."
repository: "https://github.com/BramBit/Pliegos"
featured: true
---

## 1. ¿Qué es Pliegos?

En Colombia, cada día se publican cientos de procesos de contratación estatal en el portal **SECOP II**. Para un contratista o empresa proveedora, identificar qué licitaciones se ajustan a su capacidad técnica y financiera requiere horas diarias de revisión manual de pliegos, filtrado de documentos no estandarizados y seguimiento constante para no perder cambios en fechas o presupuestos.

**Pliegos** no es solo un buscador de palabras clave; es una plataforma de inteligencia que procesa la actividad de contratación en segundo plano para clasificar, enriquecer y alertar sobre oportunidades relevantes con justificaciones claras.

---

## 2. Estado Real del Proyecto (Implementado vs. Pendiente)

El backend implementa las capacidades siguientes. El MVP integral todavía requiere frontend, integración y despliegue.

### Funcionalidades implementadas del backend
- **Sincronización incremental cada 4 horas:** Conexión con los datasets de datos abiertos de SECOP II, detectando procesos nuevos, enmiendas y cambios de estado.
- **Normalización y filtrado automático:** Reglas de descarte para modalidades no competitivas (contratación directa, régimen especial, procesos adjudicados o cancelados).
- **Procesamiento asíncrono con BullMQ:** Cola de tareas distribuida para extracción de texto, cálculo de embeddings y resúmenes automáticos fuera del ciclo de petición de la API.
- **Recuperación híbrida en PostgreSQL:** Pipeline en dos etapas combinando similitud vectorial (`pgvector`), búsqueda de texto completo (`tsvector`) y ranking unificado mediante *Reciprocal Rank Fusion* (RRF).
- **Scoring explicable y honestidad con datos incompletos:** Cada recomendación genera un puntaje desglosado con los factores que lo componen (clasificación en niveles 1, 2 y 3). Si SECOP publica información incompleta, Pliegos no la descarta arbitrariamente: la señala con honestidad en un nivel de advertencia.
- **Sistema de vigilancia y alertas:** Notificaciones programadas cuando un proceso seguido modifica su fecha de cierre, monto presupuestado o términos de referencia.

### Trabajo restante del producto
- **Integración y despliegue:** Completar la integración frontend–backend y el despliegue del MVP integral.
- **Interfaz web de usuario final (Frontend):** Actualmente en fase de diseño de experiencia y prototipado UI.
- **Portal de autoservicio para contratistas:** Configuración visual de reglas de perfilado y preferencias de notificación.

---

## 3. Arquitectura y Flujo de Procesamiento

```text
SECOP II (Datos Abiertos)
           │
           ▼
[ Sincronización Incremental (cada 4h) ]
           │
           ▼
[ Normalización y Detección de Cambios ]
           │
     ┌─────┴────────────────────────┐
     ▼                              ▼
PostgreSQL Relacional      Cola BullMQ (Workers)
(Metadata y estados)       (Embeddings y resúmenes)
     │                              │
     └──────────────┬───────────────┘
                    ▼
        [ PostgreSQL + pgvector ]
                    │
                    ▼
        [ Recuperación Híbrida: Vectorial + Texto + RRF ]
                    │
                    ▼
        [ Scoring Explicable (Niveles 1, 2 y 3) ]
                    │
                    ▼
        [ Recomendaciones y Alertas por Correo ]
```

---

## 4. Stack Tecnológico Verificado

- **Runtime & Lenguaje:** Node.js 24 con TypeScript en modo estricto.
- **Framework Backend:** NestJS 12 (inyección de dependencias, módulos y controladores REST).
- **Base de Datos & Búsqueda:** PostgreSQL 16 con extensión `pgvector` para persistencia relacional y vectorial.
- **Colas & Tareas en Segundo Plano:** BullMQ sobre Redis.
- **Infraestructura local:** Docker Compose para PostgreSQL/pgvector y Redis.
- **Integración Continua:** GitHub Actions con validación automática de compilación y pruebas.

---

## 5. Repositorio Oficial

- **Código fuente del Backend:** [github.com/BramBit/Pliegos](https://github.com/BramBit/Pliegos)
