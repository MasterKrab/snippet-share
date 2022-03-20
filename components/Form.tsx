import type { FormEventHandler } from 'react'
import modes from 'utils/modes'
import { nanoid as generateId } from 'nanoid'
import resetButton from 'styles/resetButton'
import button from 'styles/button'

interface FormProps {
  onSubmit: FormEventHandler
  language: string
  onChangeLanguage: (language: string) => void
  submitText: string
  disableSubmit?: boolean
}

const Form = ({
  onSubmit,
  language,
  onChangeLanguage,
  submitText,
  disableSubmit = false,
}: FormProps) => (
  <>
    <form className="form" onSubmit={onSubmit}>
      <select
        className="select"
        name="language"
        value={language}
        onChange={({ target }) => onChangeLanguage(target.value)}
      >
        <option value="text">Text</option>
        {modes.map(({ slug, name }) => (
          <option key={generateId()} value={slug}>
            {name}
          </option>
        ))}
      </select>
      <button disabled={disableSubmit}>{submitText}</button>
    </form>
    <style jsx>{resetButton}</style>
    <style jsx>{button}</style>
    <style jsx>{`
      .form {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .select {
        width: 208px;
        padding: 0.5rem 1.25rem;
        border-radius: 0.5rem;
      }
    `}</style>
  </>
)

export default Form
