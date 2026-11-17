import type { CollectionEntry } from 'astro:content';

export type CaseSlug = 'zeus' | 'plei' | 'veciapp' | 'maleua';
export type ExperienceLang = 'en' | 'es';
export const companyOrder = ['belvi', 'alaska'] as const;
export const projectOrder: Record<(typeof companyOrder)[number], CaseSlug[]> = {
  belvi: ['zeus', 'plei'], alaska: ['veciapp', 'maleua'],
};

export const companyCopy = {
  en: {
    belvi: { name: 'Belvi Digital', period: 'Dec 2023 – May 2026', role: 'Backend Developer with Full Stack scope', context: 'Medical device operations and professional learning products.', capabilities: ['Backend systems', 'Applied AI', 'Financial interfaces'] },
    alaska: { name: 'Alaska Tech', period: 'Since Jan 2023', role: 'Co-founder and Full Stack developer', context: 'Local commerce and institutional web projects.', capabilities: ['APIs', 'Geospatial data', 'Static delivery'] },
  },
  es: {
    belvi: { name: 'Belvi Digital', period: 'dic. 2023 – may. 2026', role: 'Backend Developer con alcance Full Stack', context: 'Operación de dispositivos médicos y formación profesional.', capabilities: ['Sistemas backend', 'IA aplicada', 'Interfaces financieras'] },
    alaska: { name: 'Alaska Tech', period: 'Desde ene. 2023', role: 'Cofundador y desarrollador Full Stack', context: 'Comercio local y proyectos web institucionales.', capabilities: ['APIs', 'Datos geoespaciales', 'Entrega estática'] },
  },
} as const;

export const projectCopy: Record<ExperienceLang, Record<CaseSlug, { name: string; problem: string; contribution: string; decision: string; tech: string[] }>> = {
  en: {
    zeus: { name: 'Zeus', problem: 'Medical device operations platform that needed documentary support and financial reporting.', contribution: 'Built the RAG pipeline, predictive analysis module, reporting features, and wallet interfaces.', decision: 'Kept RAG stages in product architecture with replaceable model adapters.', tech: ['TypeScript', 'PostgreSQL', 'pgvector', 'Next.js'] },
    plei: { name: 'PLEI', problem: 'Learning platform whose course and resource search was limited by the prior Algolia integration.', contribution: 'Built most of Smart Search and contributed frontend modules, tests, media processing, and support flows.', decision: 'Combined three retrieval routes with weighted RRF and access restrictions.', tech: ['Laravel', 'PostgreSQL', 'pgvector', 'React'] },
    veciapp: { name: 'VeciApp', problem: 'Local marketplace that needed role-based operations and location-based business search.', contribution: 'Developed backend features, geospatial data flows, payment integration, and an admin panel.', decision: 'Separated API, spatial queries, and payment integration in the implementation.', tech: ['Express', 'PostGIS', 'React', 'Wompi'] },
    maleua: { name: 'Fundación Maleua', problem: 'Fundación Maleua needed an institutional website to present its programs and public information.', contribution: 'Worked on static pages, content separation, components, and Vercel deployment.', decision: 'Used Astro static generation with structured content outside presentation components.', tech: ['Astro', 'TypeScript', 'Vercel'] },
  },
  es: {
    zeus: { name: 'Zeus', problem: 'Plataforma de operación de dispositivos médicos que requería soporte documental y reportería financiera.', contribution: 'Desarrollé el pipeline RAG, análisis predictivo, funciones de reportería e interfaces del monedero.', decision: 'Integré las etapas RAG en la arquitectura del producto con adaptadores de modelo intercambiables.', tech: ['TypeScript', 'PostgreSQL', 'pgvector', 'Next.js'] },
    plei: { name: 'PLEI', problem: 'Plataforma de formación con búsqueda de cursos y recursos limitada por la integración previa con Algolia.', contribution: 'Desarrollé la mayor parte de Smart Search y contribuí a módulos frontend, pruebas, multimedia y soporte.', decision: 'Combiné tres vías de recuperación con RRF ponderado y restricciones de acceso.', tech: ['Laravel', 'PostgreSQL', 'pgvector', 'React'] },
    veciapp: { name: 'VeciApp', problem: 'Marketplace local que necesitaba operaciones por rol y búsqueda de comercios por ubicación.', contribution: 'Desarrollé funciones backend, flujos geoespaciales, integración de pagos y panel administrativo.', decision: 'Separé API, consultas espaciales e integración de pagos en la implementación.', tech: ['Express', 'PostGIS', 'React', 'Wompi'] },
    maleua: { name: 'Fundación Maleua', problem: 'La Fundación Maleua necesitaba un sitio institucional para presentar sus programas e información pública.', contribution: 'Trabajé en páginas estáticas, separación de contenido, componentes y despliegue en Vercel.', decision: 'Utilicé generación estática con Astro y contenido estructurado fuera de los componentes.', tech: ['Astro', 'TypeScript', 'Vercel'] },
  },
};

export interface ExperienceProject {
  slug: CaseSlug;
  href: string;
  title: string;
  role: string;
  summary: string;
  profile: (typeof projectCopy)[ExperienceLang][CaseSlug];
}
export interface ExperienceGroup {
  key: (typeof companyOrder)[number];
  company: (typeof companyCopy)[ExperienceLang][(typeof companyOrder)[number]];
  projects: ExperienceProject[];
}

export function getExperienceGroups(studies: CollectionEntry<'case-studies'>[], lang: ExperienceLang): ExperienceGroup[] {
  const bySlug = new Map(studies.filter((study) => study.id.startsWith(`${lang}/`)).map((study) => [study.data.slug, study]));
  return companyOrder.map((key) => ({
    key,
    company: companyCopy[lang][key],
    projects: projectOrder[key].map((slug) => {
      const study = bySlug.get(slug);
      if (!study) throw new Error(`Missing ${lang} case study: ${slug}`);
      return {
        slug,
        href: lang === 'es' ? `/es/casos-de-exito/${slug}` : `/case-studies/${slug}`,
        title: study.data.title,
        role: study.data.role ?? '',
        summary: study.data.impactSummary ?? study.data.summary,
        profile: projectCopy[lang][slug],
      };
    }),
  }));
}
