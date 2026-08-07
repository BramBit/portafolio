import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudiesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    problem: z.string(),
    solution: z.string(),
    architecture: z.string(),
    implementation: z.string(),
    challenges: z.string(),
    results: z.string(),
    technologies: z.array(z.string()),
    publishedAt: z.date(),
  }),
});

const engineeringCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/engineering' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    readingTime: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.date(),
  }),
});

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    status: z.enum(['live', 'coming-soon']),
    problem: z.string(),
    solution: z.string(),
    website: z.string().optional(),
    featured: z.boolean(),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
  'engineering': engineeringCollection,
  'products': productsCollection,
};