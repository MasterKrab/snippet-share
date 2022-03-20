import type User from 'types/user'

interface Snippet {
  id: string
  code: string
  language: string
  created_at: string
  user?: User
}

export default Snippet
