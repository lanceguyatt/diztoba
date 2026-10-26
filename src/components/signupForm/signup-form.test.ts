import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import initSignupForm, { submit, validate } from './signup-form'

const fetchMock = vi.fn()

const getRoot = () => document.querySelector<HTMLElement>('[data-signup]')!
const getForm = () => document.querySelector<HTMLFormElement>('form')!
const getInput = (name: string) =>
  document.querySelector<HTMLInputElement>(`input[name="${name}"]`)!
const getSuccess = () => document.querySelector<HTMLElement>('[data-show="success"]')!
const getFailure = () => document.querySelector<HTMLElement>('[data-show="failure"]')!

describe('signupForm', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section data-signup>
        <form novalidate>
          <p role="alert" data-show="error" hidden></p>
          <input type="hidden" name="form-name" value="signUp" />
          <input name="firstName" aria-invalid="false" required />
          <input type="email" name="email" aria-invalid="false" aria-describedby="email-error" required />
          <p id="email-error" data-show="error" hidden></p>
          <button type="submit">Sign up</button>
          <p role="alert" data-show="failure" hidden></p>
        </form>
        <div data-show="success" tabindex="-1" hidden>Thanks<span data-signup-name></span>.</div>
      </section>
    `
    getInput('firstName').value = 'Sam'
    getInput('email').value = 'test@example.com'
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    fetchMock.mockReset()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('passes validation when every required field is valid', () => {
    expect(validate(getForm())).toBe(true)
    expect(getInput('email').getAttribute('aria-invalid')).toBe('false')
    expect(document.querySelector('[role="alert"]')!.hasAttribute('hidden')).toBe(true)
  })

  it('flags an invalid email and shows its error', () => {
    getInput('email').value = 'not-an-email'

    expect(validate(getForm())).toBe(false)
    expect(getInput('email').getAttribute('aria-invalid')).toBe('true')
    expect(document.querySelector('#email-error')!.hasAttribute('hidden')).toBe(false)
    expect(document.querySelector('[role="alert"]')!.hasAttribute('hidden')).toBe(false)
    expect(document.activeElement).toBe(getInput('email'))
  })

  it('does not post when validation fails', async () => {
    getInput('firstName').value = ''

    await submit(getRoot(), getForm())

    expect(fetchMock).not.toHaveBeenCalled()
    expect(getInput('firstName').getAttribute('aria-invalid')).toBe('true')
  })

  it('posts the encoded form data to Netlify', async () => {
    fetchMock.mockResolvedValue({ ok: true })

    await submit(getRoot(), getForm())

    expect(fetchMock).toHaveBeenCalledWith('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'form-name=signUp&firstName=Sam&email=test%40example.com',
    })
  })

  it('hides the form, resets it and shows a personalised success message', async () => {
    fetchMock.mockResolvedValue({ ok: true })

    await submit(getRoot(), getForm())

    expect(getForm().hasAttribute('hidden')).toBe(true)
    expect(getSuccess().hasAttribute('hidden')).toBe(false)
    expect(getSuccess().textContent).toBe('Thanks, Sam.')
    expect(getInput('email').value).toBe('')
    expect(document.activeElement).toBe(getSuccess())
  })

  it('shows the failure message and keeps the form on a non-OK response', async () => {
    fetchMock.mockResolvedValue({ ok: false, statusText: 'Bad Request' })

    await submit(getRoot(), getForm())

    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('Bad Request') }),
    )
    expect(getForm().hasAttribute('hidden')).toBe(false)
    expect(getSuccess().hasAttribute('hidden')).toBe(true)
    expect(getFailure().hasAttribute('hidden')).toBe(false)
    expect(getInput('email').value).toBe('test@example.com')
    expect(document.querySelector('button')!.disabled).toBe(false)
  })

  it('shows the failure message and keeps the form on a network failure', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(submit(getRoot(), getForm())).resolves.toBeUndefined()
    expect(console.error).toHaveBeenCalled()
    expect(getFailure().hasAttribute('hidden')).toBe(false)
    expect(getForm().hasAttribute('hidden')).toBe(false)
  })

  it('hides the failure message when the form is submitted again', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    await submit(getRoot(), getForm())
    expect(getFailure().hasAttribute('hidden')).toBe(false)

    fetchMock.mockResolvedValueOnce({ ok: true })
    await submit(getRoot(), getForm())

    expect(getFailure().hasAttribute('hidden')).toBe(true)
    expect(getSuccess().hasAttribute('hidden')).toBe(false)
  })

  it('keeps the failure message out of validation errors', () => {
    getInput('email').value = 'not-an-email'

    validate(getForm())

    expect(getFailure().hasAttribute('hidden')).toBe(true)
  })

  it('intercepts the native submit', async () => {
    fetchMock.mockResolvedValue({ ok: true })
    initSignupForm(getRoot())

    const event = new Event('submit', { cancelable: true })
    getForm().dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    await vi.waitFor(() => expect(getSuccess().hasAttribute('hidden')).toBe(false))
  })
})
