interface DateProps {
  date: string
  text: string
}

const SnippetDate = ({ date, text }: DateProps) => {
  const normalizedDate = new Date(date)

  return (
    <>
      <li>
        <span className="bold">{text}: </span>
        <time dateTime={normalizedDate.toISOString()}>
          {normalizedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </time>
      </li>
      <style jsx>{`
        .bold {
          font-weight: 500;
        }
      `}</style>
    </>
  )
}

export default SnippetDate
