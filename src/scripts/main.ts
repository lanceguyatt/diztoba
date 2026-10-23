import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'
import ui from '@alpinejs/ui'
import { type Alpine as A } from 'alpinejs'

function App() {
  return {
    signupForm: false,
    formData: {
      email: '',
    },
    async submitSignUpForm() {
      const formElement = document.querySelector<HTMLFormElement>('#signUp')
      if (!formElement) return
      const body = new URLSearchParams(
        new FormData(formElement) as unknown as Record<string, string>,
      ).toString()

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
            console.log('response', response)
            formElement.reset()
            console.log('Thank you for signing up')
            this.signupForm = false
          } else {
            throw new Error(`Something went wrong: ${response.statusText}`)
          }
        })
        .catch((error) => console.error(error))
    },
    init() {},
  }
}

export default (Alpine: A) => {
  Alpine.plugin(focus)
  Alpine.plugin(ui)
  Alpine.plugin(persist)
  Alpine.data('app', App)
}
