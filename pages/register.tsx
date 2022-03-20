import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import axios from 'axios'
import type Token from 'types/token'
import handleUserResponse from 'utils/handleUserResponse'
import form from 'styles/form'
import resetButton from 'styles/resetButton'
import button from 'styles/button'
import { usernameErrors, passwordErrors } from 'utils/fieldErrors'

interface User {
  username: string
  password: string
}

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const [error, setError] = useState('')

  const onSubmit = (data: User) => {
    setError('')

    axios
      .post<Token>(`${process.env.NEXT_PUBLIC_API_URL}/register`, data)
      .then(handleUserResponse)
      .catch(({ response }) => setError(response.data.detail))
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Register</h1>
        <div className="form__field">
          <input
            className="form__input"
            aria-invalid={!!errors.username}
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 12,
            })}
          />
          {errors.username && errors.username.type in usernameErrors && (
            <p className="form__error" role="alert">
              {usernameErrors[errors.username.type] || errors.username.message}
            </p>
          )}
        </div>

        <div className="form__field">
          <input
            className="form__input"
            aria-invalid={!!errors.password}
            placeholder="Password"
            aria-label="Password"
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 100,
            })}
          />
          {errors.password && errors.password.type in passwordErrors && (
            <p className="form__error" role="alert">
              {passwordErrors[errors.password.type]}
            </p>
          )}
        </div>

        {error && (
          <p className="form__error form__error--main" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="form__submit">
          Submit
        </button>
      </form>
      <style jsx>{resetButton}</style>
      <style jsx>{form}</style>
      <style jsx>{button}</style>
    </>
  )
}

export default Register
