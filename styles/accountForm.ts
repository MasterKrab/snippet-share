import css from 'styled-jsx/css'

const accountForm = css`
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  .form__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .form__input {
    padding: 0.25rem 1rem;
    border: none;
    width: 100%;
    max-width: 300px;
  }

  .form__submit {
    background-color: var(--secondary-color);
    padding: 0.25rem 1.5rem;
    margin-top: 0.5rem;
    border-radius: 0.25rem;
  }

  .form__error {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: var(--danger-color);
  }
`

export default accountForm
