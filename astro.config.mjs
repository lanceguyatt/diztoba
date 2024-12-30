import alpine from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SITE: envField.string({ context: 'client', access: 'public' }),
    },
  },
  site: 'https://diztoba.com',
  integrations: [
    alpine({
      entrypoint: '/src/scripts/main',
    }),
  ],
})
