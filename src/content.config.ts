import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const socials = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/content/socials' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      url: z.string(),
      image: image(),
    }),
})

export const collections = { socials }
