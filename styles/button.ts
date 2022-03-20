import css from 'styled-jsx/css'

const button = css`
  button {
    background-color: var(--active-color);
    padding: 0.5rem 1rem;
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 0.5rem;
  }

  button:disabled {
    color: var(--primary-color);
    cursor: not-allowed;
  }
`

export default button
