import { useState, FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import Form from 'components/Form'
import Editor from 'components/Editor'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import type Snippet from 'types/snippet'

const MainEditor = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('text')
  const router = useRouter()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    const data = { code, language }

    axios
      .post<Snippet>(
        `${process.env.NEXT_PUBLIC_API_URL}/snippets`,
        data,
        getRequestConfig()
      )
      .then(({ data }) => {
        router.push(`/${data.id}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        language={language}
        onChangeLanguage={setLanguage}
        submitText="Create Link"
        disableSubmit={!code.trim()}
      />
      <Editor value={code} onChange={setCode} language={language} />
    </>
  )
}

export default MainEditor
