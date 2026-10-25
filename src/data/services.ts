export interface ServiceItem {
  title: string;
  description: string;
  technologies: string[];
}

export const servicesES: ServiceItem[] = [
  {
    title: 'Software a la medida',
    description:
      'Desarrollo de aplicaciones web, plataformas digitales, herramientas internas y productos SaaS adaptados con precisión a la lógica y procesos de tu negocio. Desde el modelado relacional y APIs RESTful hasta la interfaz de usuario, priorizando mantenibilidad, velocidad de respuesta y control total del código.',
    technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Next.js'],
  },
  {
    title: 'Automatización e integraciones',
    description:
      'Conexión fluida entre sistemas que no se comunican, integración de pasarelas de pago, webhooks resilientes, procesamiento en segundo plano con colas y generación automática de reportes. Menos tareas manuales repetitivas, menos errores humanos y sincronización de datos confiable.',
    technologies: ['APIs REST', 'RabbitMQ', 'Redis', 'Webhooks', 'Wompi'],
  },
  {
    title: 'Inteligencia artificial aplicada',
    description:
      'Implementación de sistemas RAG sobre documentación privada, motores de búsqueda híbrida (vectorial + texto completo) y asistentes contextuales para productos existentes. Diseñados con desacoplamiento de proveedores, control estricto de latencia y costo de tokens, y respuestas ancladas a hechos reales.',
    technologies: ['RAG', 'Embeddings', 'pgvector', 'OpenAI', 'Búsqueda híbrida'],
  },
  {
    title: 'Evolución de software existente',
    description:
      'Refactorización controlada, adopción de Arquitectura Hexagonal y DDD, optimización de consultas SQL en bases de datos y cobertura de pruebas automatizadas (unitarias, integración y E2E). Modernización de sistemas en producción que necesitan escalar sin introducir regresiones.',
    technologies: ['Arquitectura Hexagonal', 'DDD', 'Vitest', 'Jest', 'Playwright'],
  },
];

export const servicesEN: ServiceItem[] = [
  {
    title: 'Custom Software Development',
    description:
      'End-to-end development of web applications, custom platforms, internal tools, and SaaS products built around your specific operational workflows. From relational data modeling and REST APIs through to high-performance interfaces, prioritizing clean maintainability and full code ownership.',
    technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Next.js'],
  },
  {
    title: 'Automation & Integrations',
    description:
      'Connecting isolated systems, integrating payment gateways, background worker queues, resilient webhooks, and automated report delivery. Eliminates manual bottlenecks, prevents human reconciliation errors, and keeps business data in sync.',
    technologies: ['REST APIs', 'RabbitMQ', 'Redis', 'Webhooks', 'Wompi'],
  },
  {
    title: 'Applied AI Systems',
    description:
      'Production RAG pipelines, hybrid search engines (vector + full-text), and contextual assistants integrated into existing products. Architected with provider-agnostic abstractions, strict token cost controls, and answers strictly grounded in your proprietary documents.',
    technologies: ['RAG', 'Embeddings', 'pgvector', 'OpenAI', 'Hybrid Search'],
  },
  {
    title: 'Software Evolution & Modernization',
    description:
      'Targeted refactoring, adoption of Hexagonal Architecture and DDD, database query optimization, and automated test suites (unit, integration, and E2E). Stabilizes mission-critical systems so they can scale and ship new features without downtime or regression risk.',
    technologies: ['Hexagonal Architecture', 'DDD', 'Vitest', 'Jest', 'Playwright'],
  },
];
