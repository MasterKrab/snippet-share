import { useContext } from 'react'
import UserContext from 'context/User/context'
import { IconContext } from 'react-icons'
import { FaInfoCircle, FaGrinAlt } from 'react-icons/fa'
import getRandomElement from 'utils/getRandomElement'

const NO_USER_MESSAGE = 'Update and delete are available with an account.'

const USER_MESSAGES = [
  'Nice to see you again!',
  "You're back!",
  'Welcome back!',
  'Welcome back, {user}!',
  "It's been a while, {user}!",
  "You're back, {user}!",
]

const UserMessage = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <p className="text">
        <IconContext.Provider
          value={{
            style: {
              color: user ? 'var(--green-color)' : 'var(--primary-color)',
            },
          }}
        >
          {user ? (
            <>
              <FaGrinAlt />{' '}
              {getRandomElement(USER_MESSAGES).replace('{user}', user.username)}
            </>
          ) : (
            <>
              <FaInfoCircle /> {NO_USER_MESSAGE}
            </>
          )}
        </IconContext.Provider>
      </p>
      <style jsx>{`
        .text {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--secondary-color);
          font-weight: bold;
          margin-top: 0;
          padding: 0.5rem 1rem;
          color: var(--primary-color);
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default UserMessage
