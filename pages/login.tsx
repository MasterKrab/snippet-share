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

interface User {
  username: string
  password: string
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const [error, setError] = useState('')

  const onSubmit = (data: User) => {
    setError('')

    axios
      .post<Token>(`${process.env.NEXT_PUBLIC_API_URL}/login`, data)
      .then(handleUserResponse)
      .catch(({ response }) => setError(response.data.detail))
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Login</h1>
        <div className="form__field">
          <input
            className="form__input"
            aria-invalid={!!errors.username}
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            {...register('username', {
              required: true,
            })}
          />
          {errors.username && (
            <p className="form__error" role="alert">
              This field is required
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
            autoComplete="current-password"
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && (
            <p className="form__error" role="alert">
              This field is required
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
      <style jsx>{form}</style>
      <style jsx>{resetButton}</style>
      <style jsx>{button}</style>
    </>
  )
}

export default Login
