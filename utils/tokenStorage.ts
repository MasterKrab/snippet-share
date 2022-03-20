export const TOKEN_KEY = 'token'

const dispatchEvent = () => {
  const event = new Event('tokenChange')
  window.dispatchEvent(event)
}

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
  dispatchEvent()
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getIsToken = () => !!getToken()

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  dispatchEvent()
}
