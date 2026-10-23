import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const nav = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/content/nav' }),
  schema: z.object({
    order: z.number().optional(),
    name: z.string(),
    url: z.string().optional(),
  }),
})

export const collections = { nav }
