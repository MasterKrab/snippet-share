import { saveToken } from 'utils/tokenStorage'
import Router from 'next/router'
import type { AxiosResponse } from 'axios'
import type Token from 'types/token'

const handleUserResponse = ({ data }: AxiosResponse<Token>) => {
  saveToken(data.access_token)

  const redirect = new URLSearchParams(window.location.search).get('redirect')

  Router.push(redirect || '/')
}

export default handleUserResponse
