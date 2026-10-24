export default () => {
  return {
    signupForm: true,
    formData: {
      name: '',
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
    init(this: { $refs: Record<string, HTMLElement | undefined>; otherFunction(): void }) {
      console.log('XD')
    },
  }
}
