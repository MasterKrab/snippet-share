import type { GetServerSideProps } from 'next'
import { useState, useContext, FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import type Snippet from 'types/snippet'
import UserContext from 'context/User/context'
import Form from 'components/Form'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import sleep from 'utils/sleep'
import Editor from 'components/Editor'
import SnippetAvatar from 'components/SnippetAvatar'
import SnippetDate from 'components/SnippetDate'
import CopyButton from 'components/CopyButton'
import isBrowser from 'utils/isBrowser'
import resetButton from 'styles/resetButton'
import button from 'styles/button'

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
  created_at,
  updated_at,
}: Snippet) => {
  const { user } = useContext(UserContext)
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState(initialLanguage)
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
      .then(() => router.replace(router.asPath))
      .catch(({ message }) => setError(message))
  }

  const handleDelete = () => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/snippets/${id}`,
        getRequestConfig()
      )
      .then(() => router.push('/'))
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
            submitText="Update"
          />
        )}
        <CopyButton textToCopy={code} label="Copy code" />
        {isBrowser && (
          <CopyButton textToCopy={window.location.href} label="Copy link" />
        )}
        {isOwner && <button onClick={handleDelete}>Delete</button>}
      </section>
      <Editor value={code} onChange={setCode} language={language} />
      <div className="bottom">
        <SnippetAvatar username={SnippetUser?.username} />
        <SnippetDate date={created_at} text="Created at" />
        {updated_at && <SnippetDate date={updated_at} text="Last update" />}
      </div>
      <style jsx>{resetButton}</style>
      <style jsx>{button}</style>
      <style jsx>{`
        .section,
        .bottom {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section {
          align-items: center;
          margin-top: 1rem;
        }
      `}</style>
    </>
  )
}

export default Snippet
