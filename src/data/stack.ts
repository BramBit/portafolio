export type StackCategory = 'backend' | 'frontend' | 'data' | 'ai' | 'infra';
export type StackLanguage = 'en' | 'es';

export interface StackItem {
  id: string;
  name: string;
  /** Content references that document this technology; not a proficiency score. */
  sources: string[];
}
export interface StackGroup { id: StackCategory; label: string; items: StackItem[]; }

interface Evidence { slug: string; technologies: string[]; }
interface Options { lang: StackLanguage; cases: Evidence[]; services: Evidence[]; }

const categoryOrder: StackCategory[] = ['backend', 'frontend', 'data', 'ai', 'infra'];
const categoryLabels: Record<StackLanguage, Record<StackCategory, string>> = {
  en: { backend: 'Backend', frontend: 'Frontend', data: 'Data & Search', ai: 'Applied AI', infra: 'Infrastructure & Quality' },
  es: { backend: 'Backend', frontend: 'Frontend', data: 'Datos y búsqueda', ai: 'IA aplicada', infra: 'Infraestructura y calidad' },
};

/** Intentional presentation order. Entries appear only when a source below documents them. */
const catalog: Record<StackCategory, string[]> = {
  backend: ['TypeScript', 'Node.js', 'NestJS', 'Express', 'PHP', 'Laravel', 'REST APIs', 'Webhooks', 'Wompi', 'Hexagonal Architecture', 'DDD'],
  frontend: ['React', 'Next.js', 'Astro', 'Vite', 'Redux Toolkit'],
  data: ['PostgreSQL', 'MySQL', 'pgvector', 'PostGIS', 'Redis', 'TypeORM'],
  ai: ['RAG', 'Embeddings', 'Hybrid Search', 'OpenAI', 'Ollama'],
  infra: ['RabbitMQ', 'BullMQ', 'GitHub Actions', 'Docker', 'Vercel', 'Render', 'AWS S3', 'Sentry', 'Jest', 'Vitest', 'Playwright', 'Cucumber'],
};

const aliases: Record<string, string> = {
  'APIs REST': 'REST APIs',
  'Arquitectura Hexagonal': 'Hexagonal Architecture',
  'Búsqueda híbrida': 'Hybrid Search',
};
const translatedNames: Record<StackLanguage, Record<string, string>> = {
  en: {},
  es: { 'REST APIs': 'APIs REST', 'Hexagonal Architecture': 'Arquitectura Hexagonal', 'Hybrid Search': 'Búsqueda híbrida' },
};

/** Explicitly documented in the English/Spanish product Markdown; products have no technology frontmatter. */
const productEvidence: Evidence[] = [
  { slug: 'product-checkout-platform', technologies: ['TypeScript', 'NestJS', 'React', 'Vite', 'Redux Toolkit', 'PostgreSQL', 'Jest', 'Vitest'] },
  { slug: 'pliegos', technologies: ['TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'pgvector', 'Redis', 'BullMQ', 'GitHub Actions', 'Docker', 'Hybrid Search'] },
];
/** Documented in case-study prose but omitted from technology frontmatter. */
const caseBodyEvidence: Evidence[] = [
  { slug: 'zeus', technologies: ['OpenAI', 'Ollama', 'Cucumber'] },
  { slug: 'plei', technologies: ['AWS S3', 'Sentry'] },
];

export function buildStackGroups({ lang, cases, services }: Options): StackGroup[] {
  const sources = new Map<string, Set<string>>();
  const add = (technology: string, source: string) => {
    const id = aliases[technology] ?? technology;
    if (!categoryOrder.some((category) => catalog[category].includes(id))) {
      throw new Error(`[stack] Categorize documented technology: ${technology}`);
    }
    const references = sources.get(id) ?? new Set<string>();
    references.add(source);
    sources.set(id, references);
  };
  for (const item of cases) for (const tech of item.technologies) add(tech, `case-studies/${item.slug}`);
  for (const item of services) for (const tech of item.technologies) add(tech, `services/${item.slug}`);
  for (const item of productEvidence) for (const tech of item.technologies) add(tech, `products/${item.slug}`);
  for (const item of caseBodyEvidence) for (const tech of item.technologies) add(tech, `case-studies/${item.slug}`);

  return categoryOrder.map((id) => ({
    id,
    label: categoryLabels[lang][id],
    items: catalog[id].filter((tech) => sources.has(tech)).map((tech) => ({
      id: tech,
      name: translatedNames[lang][tech] ?? tech,
      sources: [...sources.get(tech)!],
    })),
  }));
}
