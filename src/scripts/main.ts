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
    async submitForm() {
      this.signUpForm = false

      const formElement = document.getElementById('contact')
      const body = new URLSearchParams(new FormData(formElement)).toString()

      console.log('body', body)

      return fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      })
        .then((response) => {
          if (response.ok) {
            formElement?.reset()
            console.log('Thank you for your message!')
            this.userSignedUp = this.$persist(true)
          } else {
            throw new Error(`Something went wrong: ${response.statusText}`)
          }
        })
        .catch((error) => console.error(error))

      // console.log(JSON.stringify(this.formData))
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
