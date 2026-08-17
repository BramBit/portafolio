import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudiesCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/case-studies',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    impactSummary: z.string().optional(),
    summary: z.string(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    architecture: z.string().optional(),
    implementation: z.string().optional(),
    challenges: z.string().optional(),
    results: z.string().optional(),
    technologies: z.array(z.string()),
    company: z.string().optional(),
    role: z.string().optional(),
    timeframe: z.string().optional(),
    publishedAt: z.date(),
  }),
});

const engineeringCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/engineering',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    tldr: z.string().optional(),
    readingTime: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.date(),
  }),
});

const productsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/products',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    status: z.enum(['live', 'coming-soon']),
    problem: z.string().optional(),
    solution: z.string().optional(),
    website: z.string().optional(),
    featured: z.boolean(),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
  'engineering': engineeringCollection,
  'products': productsCollection,
};