import { z } from 'astro/zod'
import { SITE } from 'astro:env/client'

export const siteSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  image: z.object({
    secure_url: z.string(),
  }),
  socials: z.array(
    z.object({
      name: z.string(),
      url: z.url(),
      icon: z.string(),
    }),
  ),
})

export const site = siteSchema.parse({
  name: 'Diz Toba',
  description:
    'Discover London-based singer-songwriter, performer and musician and explore his unique blend of music and performance.',
  url: SITE,
  image: {
    secure_url: 'https://diztoba.com/logo.jpg',
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
      url: 'https://youtube.com/diztoba',
    },
  ],
})
