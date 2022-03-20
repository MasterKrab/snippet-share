import Link from 'next/link'
import resetList from 'styles/resetList'

interface SnippetItemProps {
  id: string
  created_at: string
}

const SnippetItem = ({ id, created_at }: SnippetItemProps) => {
  const date = new Date(created_at)

  return (
    <>
      <li className="snippet">
        <ul className="snippet__list">
          <li>
            <span className="snippet__bold">Code: </span>
            <Link href={`/${id}`}>
              <a className="snippet__id">{id}</a>
            </Link>
          </li>
          <li>
            <span className="snippet__bold">Created: </span>
            <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
          </li>
          <li className="snippet__view">
            <Link href={`/${id}`}>
              <a>View</a>
            </Link>
          </li>
        </ul>
      </li>
      <style jsx>{resetList}</style>
      <style jsx>{`
        .snippet {
          background-color: var(--secondary-color);
          border-radius: 0.25rem;
          padding: 0.5rem;
          font-size: 1.05rem;
          color: var(--primary-color);
        }

        .snippet__list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .snippet__bold {
          font-weight: bold;
        }

        .snippet__id {
          text-decoration: underline;
        }

        .snippet__view {
          background-color: var(--active-color);
          padding: 0.25rem 1rem;
          font-weight: bold;
          border-radius: 0.25rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </>
  )
}

export default SnippetItem
