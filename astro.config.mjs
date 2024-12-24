import alpine from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    alpine({
      entrypoint: '/src/scripts/main',
    }),
  ],
})
