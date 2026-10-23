import alpine from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'

import icon from 'astro-icon'

export default defineConfig({
  env: {
    schema: {
      SITE: envField.string({ context: 'client', access: 'public' }),
    },
  },
  // image: {
  //   service: passthroughImageService(),
  // },
  site: 'https://diztoba.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    alpine({
      entrypoint: '/src/scripts/main',
    }),
    icon({
      include: {
        // 'entypo-social': ['instagram', 'soundcloud', 'youtube'],
        logos: ['instagram', 'soundcloud', 'youtube'],
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Axiforma',
      cssVariable: '--font-axiforma',
      options: {
        variants: [
          {
            src: ['./src/fonts/Axiforma-Regular.woff2'],
            weight: 'normal',
            style: 'normal',
          },
          {
            src: ['./src/fonts/Axiforma-SemiBold.woff2'],
            weight: 'semibold',
            style: 'normal',
          },
        ],
      },
    },
  ],
})
