import '../styles/globals.css'
import Auth from '../context/store/Auth'

function MyApp({ Component, pageProps }) {
  return <Auth><Component {...pageProps} /></Auth>
}

export default MyApp
