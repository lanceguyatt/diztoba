import alpine from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const SITE = import.meta.env.SITE

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://diztoba.com',
  integrations: [
    alpine({
      entrypoint: '/src/scripts/main',
    }),
  ],
})
