import type { AppProps } from 'next/app'
import UserProvider from 'context/User/Provider'
import Header from 'components/Header'
import 'styles/normalize.css'
import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Header />
    <main className="main">
      <Component {...pageProps} />
    </main>
  </UserProvider>
)

export default App
