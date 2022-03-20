import { getToken } from 'utils/tokenStorage'

const getRequestConfig = () => {
  const token = getToken()

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
}

export default getRequestConfig
