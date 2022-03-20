import type { GetServerSideProps } from 'next'
import { useState, useContext, FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import type User from 'types/user'
import UserContext from 'context/User/context'
import Form from 'components/Form'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import sleep from 'utils/sleep'
import copyToClipboard from 'utils/copyToClipboard'
import Editor from 'components/Editor'
import SnippetAvatar from 'components/SnippetAvatar'
import CopyButton from 'components/CopyButton'
import isBrowser from 'utils/isBrowser'
import resetButton from 'styles/resetButton'
import button from 'styles/button'

interface Snippet {
  id: string
  code: string
  language: string
  created_at: string
  user: User
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  try {
    const { data } = await axios.get<Snippet>(
      `${process.env.NEXT_PUBLIC_API_URL}/snippets/${id}`
    )

    return {
      props: data,
    }
  } catch (error) {
    console.error(error)

    return { notFound: true }
  }
}

const Snippet = ({
  id,
  code: initialCode,
  language: initialLanguage,
  user: SnippetUser,
}: Snippet) => {
  const { user } = useContext(UserContext)
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState(initialLanguage)
  const [edited, setEdited] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    const data = { id, code, language }

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/snippets`,
        data,
        getRequestConfig()
      )
      .then(async () => {
        setEdited(true)
        await sleep(2000)
        setEdited(false)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const handleDelete = () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/snippets/${id}`,
        getRequestConfig()
      )
      .then(() => {
        router.push('/')
      })
  }

  const isOwner = SnippetUser && SnippetUser.id === user?.id

  return (
    <>
      <Head>
        <title>Snippet {id}</title>
      </Head>
      <h1>Snippet {id}</h1>
      <section className="section" aria-label="Actions">
        {error}
        {isOwner && (
          <Form
            onSubmit={handleSubmit}
            language={language}
            onChangeLanguage={setLanguage}
            submitText={edited ? 'Updated!' : 'Update'}
          />
        )}
        <CopyButton textToCopy={code} label="Copy code" />
        {isBrowser && (
          <CopyButton textToCopy={window.location.href} label="Copy link" />
        )}
        {isOwner && <button onClick={handleDelete}>Delete</button>}
      </section>
      <Editor value={code} onChange={setCode} language={language} />
      <SnippetAvatar username={SnippetUser?.username} />
      <style jsx>{resetButton}</style>
      <style jsx>{button}</style>
      <style jsx>{`
        .section {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }
      `}</style>
    </>
  )
}

export default Snippet
