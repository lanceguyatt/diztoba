import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'
import ui from '@alpinejs/ui'
import { type Alpine as A } from 'alpinejs'

function App() {
  return {
    signUpForm: true,
    userSignedUp: this.$persist(false),
    formData: {
      email: '',
    },
    submitForm() {
      this.signUpForm = false
      // console.log(JSON.stringify(this.formData))
      this.userSignedUp = this.$persist(true)
    },
    init() {
      console.log('this.userSignedUp', this.userSignedUp)
      const userSignedUp = JSON.parse(localStorage.getItem('_x_userSignedUp'))

      if (userSignedUp?.initialValue) {
        this.signUpForm = false
        console.log('userSignedUp', userSignedUp.initialValue)
      }
    },
  }
}

export default (Alpine: A) => {
  Alpine.plugin(focus)
  Alpine.plugin(ui)
  Alpine.plugin(persist)
  Alpine.data('app', App)
}

// window.Alpine = Alpine

// action="https://formspree.io/f/mrbgvvkq" method="POST"
