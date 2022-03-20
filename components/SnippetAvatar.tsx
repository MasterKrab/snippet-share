import Image from 'next/image'
import { IconContext } from 'react-icons'
import { FaRegQuestionCircle } from 'react-icons/fa'

interface SnippetAvatarProps {
  username?: string
}

const SnippetAvatar = ({ username }: SnippetAvatarProps) => (
  <>
    <article className="avatar">
      <h2 className="avatar__title">{username || 'Anonymous'}</h2>
      {username ? (
        <Image
          src={`https://avatars.dicebear.com/api/identicon/${username}.svg`}
          width={20}
          height={20}
          alt={username}
        />
      ) : (
        <IconContext.Provider value={{ style: { fontSize: '1.5rem' } }}>
          <FaRegQuestionCircle />
        </IconContext.Provider>
      )}
    </article>
    <style jsx>{`
      .avatar {
        display: inline-flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--secondary-color);
        padding: 0.5rem 1rem;
        color: var(--primary-color);
        border-radius: 0.25rem;
      }

      .avatar__title {
        display: flex;
        margin-top: 0;
        margin-bottom: 0.25rem;
        font-size: 1.25rem;
      }
    `}</style>
  </>
)

export default SnippetAvatar
