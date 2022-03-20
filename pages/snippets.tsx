import Head from 'next/head'
import useFetchData from 'hooks/useFetchData'
import getRequestConfig from 'utils/getRequestConfig'
import type Snippet from 'types/snippet'
import Loading from 'components/Loading'
import SnippetItem from 'components/SnippetItem'
import resetList from 'styles/resetList'

const Snippets = () => {
  const { data, isLoading } = useFetchData<Snippet[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/snippets`,
    getRequestConfig
  )

  return (
    <>
      <Head>
        <title>Snippets</title>
      </Head>
      <h1>Your Snippets</h1>
      <ul className="snippets">
        {isLoading ? (
          <Loading />
        ) : data?.length ? (
          data.map(({ id, created_at, updated_at }) => (
            <SnippetItem
              key={id}
              id={id}
              created_at={created_at}
              updated_at={updated_at}
            />
          ))
        ) : (
          <li>No snippets yet</li>
        )}
      </ul>
      <style jsx>{resetList}</style>
      <style jsx>{`
        .snippets {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem;
        }
      `}</style>
    </>
  )
}

export default Snippets
