import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

export const eventSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.object({
    name: z.string(),
    streetAddress: z.string(),
    postalCode: z.string(),
    addressLocality: z.string(),
    addressRegion: z.string(),
  }),
  startDate: z.date(),
  flyer: z.string().optional(),  
})

const events = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/data/events' }),
  schema: eventSchema,
    
})

const nav = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'src/data/nav' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      url: z.string().optional(),
      image: image(),
      external: z.boolean().optional(),
    }),
})


export const collections = { events, nav }
