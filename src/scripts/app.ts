import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'
import ui from '@alpinejs/ui'
import { type Alpine } from 'alpinejs'

function App() {
  return {
    show: true,
    signedUp: this.$persist(0).as(false),
    formData: {
      email: '',
    },
    submitForm() {
      this.show = false
      this.signedUp = this.$persist(1).as(true)
      console.log(JSON.stringify(this.formData))
    },
    init() {
      console.log('APP')
    },
  }
}

export default (Alpine: Alpine) => {
  Alpine.plugin(focus)
  Alpine.plugin(ui)
  Alpine.plugin(persist)

  console.log('XD')
  Alpine.data('app', App)
  // Alpine.store('darkMode', darkmode)
}

// action="https://formspree.io/f/mrbgvvkq" method="POST"