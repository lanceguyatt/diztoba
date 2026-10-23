import { defineConfig } from 'vite-plus'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    singleQuote: true,
    semi: false,
    printWidth: 100,
    sortPackageJson: true,
    sortTailwindcss: {
      functions: ['clsx', 'tv'],
    },
    astro: {},
    overrides: [
      {
        files: ['**/*.astro'],
        options: {
          astro: {
            allowShorthand: true,
          },
        },
      },
      {
        files: ['**/*.json', '**/*.jsonc'],
        options: {
          trailingComma: 'none',
        },
      },
    ],
    associations: [
      {
        files: ['**/*.astro'],
        language: 'astro',
      },
    ],
    ignorePatterns: [
      'dist',
      '**/.git',
      '**/.svn',
      '**/.hg',
      '**/node_modules',
      'pnpm-lock.yaml',
      'yarn.lock',
      'package-lock.json',
      '.vercel',
      '.astro',
    ],
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // test: {
  //   environment: 'happy-dom',
  //   environmentOptions: { happyDOM: { url: 'https://www.awin.com/' } },
  //   include: ['src/**/*.test.ts'],
  // },
})
