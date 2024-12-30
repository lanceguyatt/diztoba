import { z } from 'astro:content'
import { SITE } from "astro:env/client"

export const siteSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  image: z.object({
    secure_url: z.string(),
  }),
})

export const site = siteSchema.parse({
  name: 'Diz Toba | London-Based Songwriter, Musician & Film Production Expert',
  description:
    'Discover Diz Toba, a versatile London-based songwriter, performer, and musician offering a wide range of creative services. Explore his unique blend of music, performance, and film & media production expertise.',
  url: SITE,
  image: {
    secure_url: 'https://diztoba.com/images/logo.jpg',
  },
})
