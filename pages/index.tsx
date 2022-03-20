import type { NextPage } from 'next'
import Head from 'next/head'
import MainEditor from 'components/MainEditor'
import UserMessage from 'components/UserMessage'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div className="top">
      <h1 className="title">Snippet Share</h1>
      <p className="text">Code your snippets and share</p>
    </div>
    <MainEditor />
    <UserMessage />
    <style jsx>{`
      .top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .text {
        margin-top: 0;
        margin-bottom: 0;
      }

      .title {
        margin-right: 0.5rem;
      }

      .text {
        font-size: 1rem;
      }
    `}</style>
  </>
)

export default Home
