/// <reference types="astro/client" />

declare module '@alpinejs/focus'
declare module '@alpinejs/persist'
declare module '@alpinejs/ui'
declare module '@vimeo/player'

// interface ImportMetaEnv {
//   readonly PUBLIC_BASE_URL: string
//   // more env variables...
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }
declare module '*.astro' {
  const Component: (props: Record<string, any>) => any
  export default Component
}
