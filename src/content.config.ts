import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

export const showSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  location: z.object({
    name: z.string(),
    address: z.object({
      streetAddress: z.string().optional(),
      extendedAddress: z.string().optional(),
      addressLocality: z.string().optional(),
      postalCode: z.string().optional(),
      addressRegion: z.string().optional(),
      addressCountry: z.string().optional(),
    }),
  }),
  date: z.coerce.date(),
  tickets: z.url().optional(),
  freeEntry: z.boolean().optional().default(false),
})

export type Show = z.infer<typeof showSchema>

const shows = defineCollection({
  loader: file('src/content/shows.yaml'),
  schema: showSchema,
})

export const collections = { shows }
