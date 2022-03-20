import { useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import UserContext from 'context/User/context'
import Image from 'next/image'
import UsernameForm from 'components/UsernameForm'
import PasswordForm from 'components/PasswordForm'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import { removeToken } from 'utils/tokenStorage'
import resetButton from 'styles/resetButton'
import button from 'styles/button'

const Account = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  if (!user) return null

  const { username } = user

  const handleLogout = () => {
    router.push('/')
    removeToken()
  }

  const handleDelete = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/user`, getRequestConfig())
      .then(handleLogout)
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <article className="user">
        <h1>{username}</h1>
        <Image
          src={`https://avatars.dicebear.com/api/identicon/${username}.svg`}
          width={50}
          height={50}
          alt={username}
        />
      </article>

      <UsernameForm />
      <PasswordForm />

      <section className="actions">
        <h2>Actions</h2>
        <div className="buttons">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDelete}>Delete account</button>
        </div>
      </section>
      <style jsx>{resetButton}</style>
      <style jsx>{button}</style>
      <style jsx>{`
        .user {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--secondary-color);
        }

        .actions {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
      `}</style>
    </>
  )
}

export default Account
