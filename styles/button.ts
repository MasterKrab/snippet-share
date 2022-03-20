import css from 'styled-jsx/css'

const button = css`
  button {
    padding: 0.5rem 1rem;
    font-weight: 500;
    font-size: 1.1rem;
    color: var(--active-color);
    border-radius: 0.75rem;
    border: 2px solid var(--active-color);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  }

  @media (hover: hover) {
    button {
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    button:hover:not(:disabled) {
      background-color: var(--active-color);
      color: var(--primary-color);
    }
  }

  button:disabled {
    cursor: not-allowed;
  }
`

export default button
