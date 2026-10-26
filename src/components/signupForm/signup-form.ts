const show = (element: Element | null, visible: boolean) =>
  element?.toggleAttribute('hidden', !visible)

const encode = (form: HTMLFormElement) =>
  new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()

export const validate = (form: HTMLFormElement) => {
  const fields = Array.from(form.querySelectorAll<HTMLInputElement>('input[required]'))

  fields.forEach((field) => {
    const invalid = !field.validity.valid
    field.setAttribute('aria-invalid', String(invalid))
    const errorId = field.getAttribute('aria-describedby')
    if (errorId) show(form.querySelector(`#${errorId}`), invalid)
  })

  const firstInvalid = fields.find((field) => !field.validity.valid)
  show(form.querySelector('[role="alert"][data-show="error"]'), Boolean(firstInvalid))
  firstInvalid?.focus()

  return !firstInvalid
}

export const submit = async (root: HTMLElement, form: HTMLFormElement) => {
  const failure = form.querySelector('[data-show="failure"]')
  show(failure, false)

  if (!validate(form)) return

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  if (button) button.disabled = true

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(form),
    })
    if (!response.ok) throw new Error(`Something went wrong: ${response.statusText}`)

    const success = root.querySelector<HTMLElement>('[data-show="success"]')
    const name = root.querySelector('[data-signup-name]')
    const firstName = form.querySelector<HTMLInputElement>('input[name="firstName"]')
    if (name && firstName?.value) name.textContent = `, ${firstName.value}`

    form.reset()
    show(form, false)
    show(success, true)
    success?.focus()
  } catch (error) {
    console.error(error)
    show(failure, true)
  } finally {
    if (button) button.disabled = false
  }
}

export default (root: HTMLElement) => {
  const form = root.querySelector('form')
  if (!form) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    void submit(root, form)
  })
}
