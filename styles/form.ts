import css from 'styled-jsx/css'

const form = css`
  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 95%;
    max-width: 500px;
    padding: 1.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    color: var(--primary-color);
    box-shadow: 0 0.25rem 1rem rgba(255, 255, 255, 0.25);
  }

  .form__title {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.75rem;
  }

  .form__field {
    position: relative;
    min-height: 5rem;
  }

  .form__input {
    padding: 0.75rem 1rem;
    width: 100%;
    font-weight: 500;
    border: none;
    border-bottom: 2px solid var(--primary-color-light);
  }

  .form__input::placeholder {
    color: #555;
  }

  .form__error {
    margin-top: 0.25rem;
    font-size: 0.85rem;
    font-weight: bold;
    color: var(--danger-color);
  }

  .form__error--main {
    position: absolute;
    top: -1rem;
    left: 0;
    background-color: var(--secondary-color);
    width: 100%;
    transform: translateY(-100%);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }

  .form__submit {
    background-color: var(--primary-color-light);
    width: min-content;
    margin-top: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    color: var(--secondary-color);
  }
`

export default form
