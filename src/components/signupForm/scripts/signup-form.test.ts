import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import signupForm from './signup-form'

const fetchMock = vi.fn()

const getEmailInput = () => document.querySelector<HTMLInputElement>('input[name="email"]')!

describe('signupForm', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="signUp">
        <input type="hidden" name="form-name" value="signUp" />
        <input type="email" name="email" />
      </form>
    `
    getEmailInput().value = 'test@example.com'
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    fetchMock.mockReset()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('has the expected initial state', () => {
    const data = signupForm()

    expect(data.signupForm).toBe(true)
    expect(data.formData.email).toBe('')
  })

  it('does nothing when the form is missing', async () => {
    document.body.innerHTML = ''
    const data = signupForm()

    await expect(data.submitSignUpForm()).resolves.toBeUndefined()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('posts the encoded form data to Netlify', async () => {
    fetchMock.mockResolvedValue({ ok: true })
    const data = signupForm()

    await data.submitSignUpForm()

    expect(fetchMock).toHaveBeenCalledWith('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'form-name=signUp&email=test%40example.com',
    })
  })

  it('hides the form and resets it on success', async () => {
    fetchMock.mockResolvedValue({ ok: true })
    const data = signupForm()

    await data.submitSignUpForm()

    expect(data.signupForm).toBe(false)
    expect(getEmailInput().value).toBe('')
  })

  it('logs an error and keeps the form on a non-OK response', async () => {
    fetchMock.mockResolvedValue({ ok: false, statusText: 'Bad Request' })
    const data = signupForm()

    await data.submitSignUpForm()

    expect(data.signupForm).toBe(true)
    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('Bad Request') }),
    )
    expect(vi.mocked(console.error).mock.calls[0][0]).toBeInstanceOf(Error)
    expect(getEmailInput().value).toBe('test@example.com')
  })

  it('logs an error and keeps the form on a network failure', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
    const data = signupForm()

    await expect(data.submitSignUpForm()).resolves.toBeUndefined()
    expect(console.error).toHaveBeenCalled()
    expect(data.signupForm).toBe(true)
  })
})
