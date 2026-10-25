import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    canonical: z.url().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
  }),
});

const talks = defineCollection({
  loader: file('src/content/talks.json'),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    url: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { writing, work, talks };
