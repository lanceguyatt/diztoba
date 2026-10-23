import type Alpine from 'alpinejs'

declare global {
  // The @astrojs/alpinejs integration exposes its instance as window.Alpine
  const Alpine: Alpine.Alpine

  interface Window {
    Alpine?: Alpine.Alpine
  }
}

declare module 'alpinejs' {
  interface Alpine {
    // @types/async-alpine types `download` as returning a component, but we pass dynamic
    // import()s; async-alpine uses the export named after the component, then `default`
    asyncData(name: string, download: (name: string) => Promise<object>): void
  }

  // interface Stores {
  //   document: { name: string }
  // }
}

export {}
