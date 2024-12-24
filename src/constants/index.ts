import { z } from 'astro:content'

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

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
  description: 'Diz Toba website',
  url: BASE_URL,
  image: {
    secure_url: 'https://diztoba.com/images/logo.jpg',
  },
})
