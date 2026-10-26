import { z } from 'astro/zod'
import { SITE } from 'astro:env/client'

const imageSchema = z.object({
  secure_url: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
  type: z.string(),
})

export const webPageSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  locale: z.string(),
  twitter: z.string(),
  image: imageSchema,
  socials: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      icon: z.string(),
    }),
  ),
})

export const personSchema = z.object({
  name: z.string(),
  description: z.string(),
  jobTitle: z.string(),
  homeLocation: z.string(),
  url: z.string(),
  image: imageSchema,
  socials: z.array(
    z.object({
      url: z.string(),
    }),
  ),
})

export const site = webPageSchema.parse({
  name: 'Diz Toba',
  // ~50 chars so it isn't truncated in search results
  title: 'Diz Toba | London Singer-Songwriter & Musician',
  // ~150 chars, the length Google typically shows
  description:
    'Diz Toba is a London-based singer-songwriter, performer and musician. Listen to new releases, watch videos and find upcoming live shows.',
  url: SITE,
  locale: 'en_GB',
  twitter: 'dtoba',
  image: {
    secure_url: 'https://diztoba.com/logo.jpg',
    alt: 'Diz Toba logo',
    width: 864,
    height: 864,
    type: 'image/jpeg',
  },
  socials: [
    {
      name: 'Instagram',
      icon: 'entypo-social:instagram',
      url: 'https://www.instagram.com/diztoba',
    },
    {
      name: 'Soundcloud',
      icon: 'entypo-social:soundcloud',
      url: 'https://www.soundcloud.com/diztoba',
    },
    {
      name: 'Youtube',
      icon: 'entypo-social:youtube',
      url: 'https://youtube.com/@diztoba',
    },
  ],
})

export const dizToba = personSchema.parse({
  name: site.name,
  description: 'London-based singer-songwriter, performer and musician',
  jobTitle: 'Singer-songwriter',
  homeLocation: 'London, United Kingdom',
  url: SITE,
  image: site.image,
  socials: site.socials.map(({ url }) => ({ url })),
})
