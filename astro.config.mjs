import alpine from '@astrojs/alpinejs'
import partytown from '@astrojs/partytown'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'

import icon from 'astro-icon'

export default defineConfig({
  env: {
    schema: {
      SITE: envField.string({ context: 'client', access: 'public' }),
      GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
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
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      include: {
        // 'entypo-social': ['instagram', 'soundcloud', 'youtube'],
        logos: ['instagram', 'soundcloud', 'youtube'],
        'thesvg-color': ['*'],
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
