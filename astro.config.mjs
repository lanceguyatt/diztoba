import alpine from '@astrojs/alpinejs'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    alpine({
      entrypoint: '/src/scripts/app',
    }),
    icon({
      // include: {
      //   // Include only three `mdi` icons in the bundle
      //   mdi: ['twitter'],
      // },
      // svgoOptions: {
      //   multipass: true,
      //   plugins: [
      //     {
      //       name: 'preset-default',
      //       params: {
      //         overrides: {
      //           mergePaths: {
      //             force: false,
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
  // build: {
  //   minify: false,
  //   sourcemap: false,
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     // input: {
  //     //   index: './index.html',
  //     // },
  //     output: {
  //       entryFileNames: 'assets/[name].js',
  //       chunkFileNames: 'assets/[name].js',
  //       assetFileNames: 'assets/[name].[ext]',
  //     },
  //   },
  // },
})
