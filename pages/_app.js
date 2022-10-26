import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { BasketProvider } from '../context/ShoppingBasket'

function MyApp({ Component, pageProps }) {
  return (
    <BasketProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </BasketProvider>
  )
}

export default MyApp
