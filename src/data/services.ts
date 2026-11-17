export type ServiceId = 'custom-software' | 'automation' | 'applied-ai' | 'modernization';
export type CaseSlug = 'zeus' | 'plei' | 'veciapp' | 'maleua';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  summary: string;
  whenUseful: string;
  problem: string;
  approach: string;
  capabilities: string[];
  technologies: string[];
  relatedCases: { slug: CaseSlug; label: string }[];
}

export const servicesES: ServiceItem[] = [
  {
    id: 'custom-software', title: 'Software a la medida',
    summary: 'Aplicaciones y plataformas diseñadas alrededor de los procesos reales de tu negocio.',
    whenUseful: 'Cuando una herramienta estándar obliga al equipo a adaptar su operación o mantener procesos paralelos.',
    problem: 'Los datos y las tareas quedan repartidos entre sistemas que no reflejan el flujo real de trabajo.',
    approach: 'Definir el proceso y sus reglas; diseñar modelo de datos, API e interfaz; entregar módulos mantenibles.',
    capabilities: ['Aplicaciones web', 'APIs y lógica de negocio', 'Modelado de datos', 'Herramientas internas'],
    technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Next.js'],
    relatedCases: [{ slug: 'veciapp', label: 'VeciApp — API y panel administrativo' }, { slug: 'maleua', label: 'Fundación Maleua — sitio y contenido desacoplado' }],
  },
  {
    id: 'automation', title: 'Automatización e integraciones',
    summary: 'Sistemas conectados mediante eventos, colas y APIs para reducir tareas manuales repetitivas.',
    whenUseful: 'Cuando un equipo copia información entre plataformas o necesita procesar eventos en segundo plano.',
    problem: 'Las operaciones manuales dificultan seguir el estado de cada proceso y mantener los datos sincronizados.',
    approach: 'Definir contratos, recibir y validar eventos, procesarlos de forma desacoplada y registrar resultados.',
    capabilities: ['Integraciones API', 'Webhooks', 'Colas y workers', 'Procesos programados'],
    technologies: ['APIs REST', 'RabbitMQ', 'Redis', 'Webhooks', 'Wompi'],
    relatedCases: [{ slug: 'veciapp', label: 'VeciApp — confirmación de pagos' }, { slug: 'plei', label: 'PLEI — sincronización y triage de incidentes' }],
  },
  {
    id: 'applied-ai', title: 'Inteligencia artificial aplicada',
    summary: 'Búsqueda y asistencia contextual conectadas con la información de un producto.',
    whenUseful: 'Cuando encontrar recursos relevantes consume tiempo o las respuestas necesitan contexto documental.',
    problem: 'Una búsqueda simple puede perder contenido relevante o no mostrar de dónde procede la información.',
    approach: 'Preparar fuentes, combinar recuperación textual y semántica cuando aporte valor y pasar contexto a la generación.',
    capabilities: ['Pipelines RAG', 'Búsqueda híbrida', 'Embeddings', 'Asistentes contextuales'],
    technologies: ['RAG', 'Embeddings', 'pgvector', 'OpenAI', 'Búsqueda híbrida'],
    relatedCases: [{ slug: 'zeus', label: 'Zeus — asistente sobre documentación técnica' }, { slug: 'plei', label: 'PLEI — búsqueda híbrida' }],
  },
  {
    id: 'modernization', title: 'Evolución de software existente',
    summary: 'Cambios enfocados en sistemas en producción para facilitar mantenimiento y controlar regresiones.',
    whenUseful: 'Cuando una base de código ralentiza entregas, mezcla responsabilidades o carece de pruebas en flujos críticos.',
    problem: 'Cada cambio afecta demasiadas piezas y resulta difícil identificar qué comportamiento se alteró.',
    approach: 'Identificar límites entre módulos, refactorizar por etapas y validar los cambios con pruebas pertinentes.',
    capabilities: ['Refactorización', 'Límites de arquitectura', 'Optimización de consultas', 'Pruebas automatizadas'],
    technologies: ['Arquitectura Hexagonal', 'DDD', 'Vitest', 'Jest', 'Playwright'],
    relatedCases: [{ slug: 'plei', label: 'PLEI — reorganización del frontend y pruebas' }, { slug: 'zeus', label: 'Zeus — módulos y pruebas de flujos críticos' }],
  },
];

export const servicesEN: ServiceItem[] = [
  {
    id: 'custom-software', title: 'Custom Software Development',
    summary: 'Applications and platforms designed around your actual business workflows.',
    whenUseful: 'When standard tools force a team to change its process or maintain parallel workflows.',
    problem: 'Data and tasks become scattered across systems that do not reflect the actual work.',
    approach: 'Define the workflow and its rules; design the data model, API, and interface; deliver maintainable modules.',
    capabilities: ['Web applications', 'APIs and business logic', 'Data modeling', 'Internal tools'],
    technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Next.js'],
    relatedCases: [{ slug: 'veciapp', label: 'VeciApp — API and admin dashboard' }, { slug: 'maleua', label: 'Fundación Maleua — site and decoupled content' }],
  },
  {
    id: 'automation', title: 'Automation & Integrations',
    summary: 'Systems connected through events, queues, and APIs to reduce repetitive manual work.',
    whenUseful: 'When a team copies data between platforms or needs background event processing.',
    problem: 'Manual operations make it hard to track each process and keep data synchronized.',
    approach: 'Define contracts, receive and validate events, process them separately, and record outcomes.',
    capabilities: ['API integrations', 'Webhooks', 'Queues and workers', 'Scheduled processes'],
    technologies: ['REST APIs', 'RabbitMQ', 'Redis', 'Webhooks', 'Wompi'],
    relatedCases: [{ slug: 'veciapp', label: 'VeciApp — payment confirmation' }, { slug: 'plei', label: 'PLEI — synchronization and incident triage' }],
  },
  {
    id: 'applied-ai', title: 'Applied AI Systems',
    summary: 'Search and contextual assistance connected to a product’s own information.',
    whenUseful: 'When finding relevant resources takes time or answers need documentary context.',
    problem: 'Simple search can miss relevant content or fail to show where information came from.',
    approach: 'Prepare sources, combine lexical and semantic retrieval where useful, and pass context to the generation layer.',
    capabilities: ['RAG pipelines', 'Hybrid search', 'Embeddings', 'Contextual assistants'],
    technologies: ['RAG', 'Embeddings', 'pgvector', 'OpenAI', 'Hybrid Search'],
    relatedCases: [{ slug: 'zeus', label: 'Zeus — technical documentation assistant' }, { slug: 'plei', label: 'PLEI — hybrid search' }],
  },
  {
    id: 'modernization', title: 'Software Evolution & Modernization',
    summary: 'Focused changes to live systems that support maintenance and help manage regressions.',
    whenUseful: 'When a codebase slows delivery, mixes responsibilities, or lacks tests around critical flows.',
    problem: 'Each change affects too many areas, making it difficult to see which behavior has changed.',
    approach: 'Identify module boundaries, refactor in stages, and support changes with relevant automated tests.',
    capabilities: ['Refactoring', 'Architecture boundaries', 'Query optimization', 'Automated tests'],
    technologies: ['Hexagonal Architecture', 'DDD', 'Vitest', 'Jest', 'Playwright'],
    relatedCases: [{ slug: 'plei', label: 'PLEI — frontend restructuring and testing' }, { slug: 'zeus', label: 'Zeus — modules and critical flow tests' }],
  },
];
