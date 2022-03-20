import { FaClock } from 'react-icons/fa'

interface SnippetDateProps {
  date: string
  text: string
}

const SnippetDate = ({ date, text }: SnippetDateProps) => {
  const normalizedDate = new Date(date)

  return (
    <>
      <p className="text">
        <FaClock />
        <span className="text__key">{text}: </span>
        <time className="time" dateTime={normalizedDate.toISOString()}>
          {normalizedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </time>
      </p>
      <style jsx>{`
        .text {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: var(--secondary-color);
          padding: 0.7rem 1rem;
          color: var(--primary-color);
          border-radius: 0.25rem;
          margin-top: 0;
          margin-bottom: 0;
        }

        .text__key {
          font-weight: 500;
        }
      `}</style>
    </>
  )
}

export default SnippetDate
