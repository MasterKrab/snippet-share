import { useState, useContext } from 'react'
import UserContext from 'context/User/context'
import { useForm } from 'react-hook-form'
import { usernameErrors } from 'utils/fieldErrors'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import type User from 'types/user'
import accountForm from 'styles/accountForm'
import resetButton from 'styles/resetButton'

interface FormData {
  username: string
}

const UsernameForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const [error, setError] = useState('')
  const { setUser } = useContext(UserContext)

  const onSubmit = (data: FormData) => {
    setError('')

    axios
      .put<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        data,
        getRequestConfig()
      )
      .then(({ data }) => {
        reset()
        setUser!(data)
      })
      .catch(({ response }) => setError(response.data.detail))
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Change username</h2>
        <input
          type="text"
          className="form__input"
          placeholder="Username"
          aria-label="Username"
          autoComplete="username"
          aria-invalid={!!errors.username}
          {...register('username', {
            required: true,
            minLength: 3,
            maxLength: 12,
          })}
        />
        {errors.username && errors.username.type in usernameErrors && (
          <p className="form__error" role="alert">
            {usernameErrors[errors.username.type]}
          </p>
        )}
        <button className="form__submit">Change</button>
        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}
      </form>
      <style jsx>{accountForm}</style>
      <style jsx>{resetButton}</style>
    </>
  )
}

export default UsernameForm
