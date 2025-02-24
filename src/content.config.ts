import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const events = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/data/events' }),
  schema: () =>
    z.object({
      startDate: z.date(),
      location: z.object({
        name: z.string(),
        street: z.string(),
        postalcode: z.string(),
        locality: z.string(),
        region: z.string(),
      }),
    }),
})

const nav = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/data/nav' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      url: z.string().optional(),
      image: image(),
    }),
})


export const collections = { events, nav }
