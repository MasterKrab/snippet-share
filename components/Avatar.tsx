import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserContext from 'context/User/context'

const Avatar = () => {
  const { user } = useContext(UserContext)
  const { username } = user!

  return (
    <>
      <li>
        <Link href="/account">
          <a className="link">
            {username}
            <span className="image-container">
              <Image
                src={`https://avatars.dicebear.com/api/identicon/${username}.svg`}
                width={15}
                height={15}
                alt={username}
              />
            </span>
          </a>
        </Link>
      </li>
      <style jsx>{`
        .link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .image-container {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 0.35rem;
        }
      `}</style>
    </>
  )
}

export default Avatar
