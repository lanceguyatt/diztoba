import { z } from 'astro:content'
import { SITE } from 'astro:env/client'

export const siteSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  image: z.object({
    secure_url: z.string(),
  }),
})

export const site = siteSchema.parse({
  name: 'Diz Toba',
  description:
    'Discover London-based singer-songwriter, performer and musician and explore his unique blend of music and performance.',
  url: SITE,
  image: {
    secure_url: 'https://diztoba.com/logo.jpg',
  },
})
