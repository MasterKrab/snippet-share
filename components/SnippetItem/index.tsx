import Link from 'next/link'
import SnippetDate from './SnippetDate'
import resetList from 'styles/resetList'

interface SnippetItemProps {
  id: string
  created_at: string
  updated_at?: string
}

const SnippetItem = ({ id, created_at, updated_at }: SnippetItemProps) => (
  <>
    <li className="snippet">
      <ul className="snippet__list">
        <li>
          <span className="snippet__bold">Code: </span>
          <Link href={`/${id}`}>
            <a className="snippet__id">{id}</a>
          </Link>
        </li>
        <SnippetDate date={created_at} text="Created at" />
        {updated_at && <SnippetDate date={updated_at} text="Updated at" />}
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
        background-color: var(--primary-color-light);
        padding: 0.75rem;
        font-size: 1.05rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
      }

      .snippet__list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .snippet__bold {
        font-weight: 500;
      }

      .snippet__id {
        text-decoration: underline;
      }

      .snippet__view {
        background-color: var(--secondary-color);
        padding: 0.25rem 1rem;
        border-radius: 0.25rem;
        margin-top: 0.25rem;
        color: var(--primary-color);
      }
    `}</style>
  </>
)

export default SnippetItem
