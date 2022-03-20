import { createContext, Dispatch, SetStateAction } from 'react'
import type User from 'types/user'

interface IUserContext {
  user?: User | null
  setUser?: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<IUserContext>({})

export default UserContext
