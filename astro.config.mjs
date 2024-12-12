import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
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
});
