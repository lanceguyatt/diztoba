import { file } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { parse as parseToml } from 'toml'

const links = defineCollection({
  loader: file('src/data/links.toml', {
    parser: (text) => parseToml(text).links,
  }),
  schema: z.object({
    id: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    name: z.string(),
    url: z.string(),
  }),
})

export const collections = { links }
