import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const socials = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/content/socials' }),
  schema: z.object({
    order: z.number().optional(),
    name: z.string(),
    url: z.string().optional(),
    image: z.string().optional(),
  }),
})

export const collections = { socials }
