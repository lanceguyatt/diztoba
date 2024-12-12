// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
import { parse as parseToml } from "toml";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const links = defineCollection({
  // loader: file("src/data/links.json"),
  loader: file("src/data/links.toml", {
    parser: (text) => parseToml(text).links,
  }),
  schema: z.object({
    id: z.string(),
    icon: z.string().optional(),
    name: z.string(),
    url: z.string(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { links };
