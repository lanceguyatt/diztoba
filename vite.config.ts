import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    semi: false,
    printWidth: 100,
    sortPackageJson: false,
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
      'src/scripts/vendor',
      'src/layouts/default/components',
    ],
  },
  lint: {
    jsPlugins: ['eslint-plugin-astro', { name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
})
