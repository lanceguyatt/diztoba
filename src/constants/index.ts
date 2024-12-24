import { z } from 'astro:content'

export const siteSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.object({
    secure_url: z.string(),
  }),
})

export const site = siteSchema.parse({
  name: 'Diz Toba',
  description: 'Diz Toba description',
  image: {
    secure_url: 'https://diztoba.com/images/logo.png',
  },
})
