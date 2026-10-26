import { defineConfig, envField, fontProviders } from 'astro/config'
// import alpine from '@astrojs/alpinejs'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
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
    // alpine({
    //   entrypoint: '/src/scripts/main',
    // }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      include: {
        'entypo-social': ['instagram', 'soundcloud', 'youtube'],
        logos: ['instagram', 'soundcloud', 'youtube'],
        'thesvg-color': ['*'],
      },
    }),
    sitemap({
      filter: (page) => !page.includes('/theme/'),
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
            weight: 400,
            style: 'normal',
            src: ['./src/fonts/axiforma-regular.woff2'],
          },
          {
            weight: 600,
            style: 'normal',
            src: ['./src/fonts/axiforma-semibold.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Gotham',
      cssVariable: '--font-gotham',
      options: {
        variants: [
          {
            weight: 700,
            style: 'normal',
            src: ['./src/fonts/gotham-bold.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Realbook',
      cssVariable: '--font-realbook',
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/fonts/realbook.woff'],
          },
        ],
      },
    },
  ],
})
