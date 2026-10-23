import type Alpine from 'alpinejs'
import AsyncAlpine from 'async-alpine'

type AlpineType = typeof Alpine

// ============================================
// Plugin Setup
// ============================================
const setupPlugins = (alpine: AlpineType) => {
  // ;[focus, ui, persist].forEach((plugin) => alpine.plugin(plugin))
  alpine.plugin(AsyncAlpine)
}

// ============================================
// Async Data Registration
// ============================================
const registerAsyncData = (alpine: AlpineType) => {
  const asyncMap = {
    signupForm: () => import('../components/signupForm/scripts/signup-form'),
  }

  Object.entries(asyncMap).forEach(([name, importFn]) => {
    alpine.asyncData(name, importFn)
  })
}

export default (alpine: AlpineType) => {
  setupPlugins(alpine)
  document.addEventListener('alpine:init', () => {
    registerAsyncData(alpine)
  })
}
