interface Errors {
  [key: string]: string
}

export const usernameErrors: Errors = {
  required: 'This field is required',
  minLength: 'Username must be at least 3 characters',
  maxLength: 'Username must be at most 20 characters',
}

export const passwordErrors: Errors = {
  required: 'This field is required',
  minLength: 'Password must be at least 8 characters',
  maxLength: 'Password must be at most 100 characters',
}
