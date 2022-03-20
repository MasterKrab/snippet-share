import { useState, useContext } from 'react'
import UserContext from 'context/User/context'
import { useForm } from 'react-hook-form'
import { passwordErrors } from 'utils/fieldErrors'
import axios from 'axios'
import getRequestConfig from 'utils/getRequestConfig'
import type User from 'types/user'
import accountForm from 'styles/accountForm'
import resetButton from 'styles/resetButton'

interface FormData {
  old_password: string
  password: string
}

const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const [error, setError] = useState('')
  const { user } = useContext(UserContext)

  const onSubmit = (data: FormData) => {
    if (data.old_password === data.password)
      return setError('New password must be different from old password')

    setError('')

    axios
      .put<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        data,
        getRequestConfig()
      )
      .then(() => reset())
      .catch(({ response }) => setError(response.data.detail))
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Change password</h2>

        <input
          type="text"
          defaultValue={user!.username}
          name="username"
          autoComplete="username"
          hidden
        />

        <div className="form__body">
          <div>
            <input
              type="password"
              className="form__input"
              placeholder="Old password"
              aria-label="Old password"
              autoComplete="current-password"
              aria-invalid={!!errors.old_password}
              {...register('old_password', {
                required: true,
              })}
            />
            {errors.old_password && (
              <p className="form__error" role="alert">
                This field is required.
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              className="form__input"
              placeholder="New password"
              aria-label="New password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
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
        </div>

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

export default PasswordForm
