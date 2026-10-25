export type StackCategory = 'backend' | 'frontend' | 'data' | 'ai' | 'infra';

/** Category of every technology documented in the content collections or the services */
const categoryOf: Record<string, StackCategory[]> = {
  TypeScript: ['backend'],
  'Node.js': ['backend'],
  NestJS: ['backend'],
  Express: ['backend'],
  Laravel: ['backend'],
  PHP: ['backend'],
  'REST APIs': ['backend'],
  'APIs REST': ['backend'],
  DDD: ['backend'],
  'Hexagonal Architecture': ['backend'],
  'Arquitectura Hexagonal': ['backend'],
  React: ['frontend'],
  'Next.js': ['frontend'],
  Vite: ['frontend'],
  Astro: ['frontend'],
  PostgreSQL: ['data'],
  Redis: ['data'],
  pgvector: ['data'],
  PostGIS: ['data'],
  MySQL: ['data'],
  RAG: ['ai'],
  Embeddings: ['ai'],
  OpenAI: ['ai'],
  'Hybrid Search': ['ai'],
  'Búsqueda híbrida': ['ai'],
  Ollama: ['ai'],
  RabbitMQ: ['infra'],
  Render: ['infra'],
  Vercel: ['infra'],
  Docker: ['infra'],
  Vitest: ['infra'],
  Jest: ['infra'],
  Playwright: ['infra'],
  Webhooks: ['infra'],
  Wompi: ['infra'],
};

const ORDER: StackCategory[] = ['backend', 'frontend', 'data', 'ai', 'infra'];

export interface StackItem {
  name: string;
  /** Pre-formatted evidence text, e.g. "3 projects" */
  usage: string;
}

export interface StackGroup {
  label: string;
  /** Technologies documented in more than one project */
  primary: StackItem[];
  secondary: string[];
}

interface Options {
  /** Technologies of every documented project */
  projects: string[][];
  /** Technologies documented elsewhere (e.g. services) that are not tied to a project */
  extra?: string[];
  labels: Record<StackCategory, string>;
  usage: (projects: number) => string;
}

/**
 * Builds the stack groups using only technologies already present in the content.
 * Hierarchy is evidence-based: a technology is highlighted when it appears in 2+ projects.
 * No proficiency levels are implied.
 */
export function buildStackGroups({ projects, extra = [], labels, usage }: Options): StackGroup[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tech of new Set(project)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  for (const tech of extra) if (!counts.has(tech)) counts.set(tech, 0);

  const byCategory = new Map<StackCategory, [string, number][]>();
  for (const [tech, count] of counts) {
    const categories = categoryOf[tech];
    if (!categories) {
      console.warn(`[stack] "${tech}" has no category in src/data/stack.ts; listed under tools`);
    }
    for (const category of categories ?? ['infra' as StackCategory]) {
      byCategory.set(category, [...(byCategory.get(category) ?? []), [tech, count]]);
    }
  }

  return ORDER.filter((category) => byCategory.has(category)).map((category) => {
    const items = byCategory.get(category)!.sort((a, b) => b[1] - a[1]);
    return {
      label: labels[category],
      primary: items.filter(([, n]) => n >= 2).map(([name, n]) => ({ name, usage: usage(n) })),
      secondary: items.filter(([, n]) => n < 2).map(([name]) => name),
    };
  });
}
