import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from './context'
import type User from 'types/user'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import { TOKEN_KEY, getIsToken } from 'utils/tokenStorage'

const protectedRoutes = new Set(['account', 'snippets'])

interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = () => {
      if (!getIsToken()) return setUser(null)

      setIsLoading(true)

      axios
        .get<User>(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          getRequestConfig()
        )
        .then(({ data }) => setUser(data))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false))
    }

    fetchUser()

    const handleStorage = ({ key }: StorageEvent) => {
      key === TOKEN_KEY && fetchUser()
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('tokenChange', fetchUser)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('tokenChange', fetchUser)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (!protectedRoutes.has(router.pathname.split('/')[1])) return
    if (user) return

    router.push('/login', {
      query: {
        redirect: router.pathname,
      },
    })
  }, [router.pathname, user, isLoading])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
