import { AppContextProvider } from '../data/contexts/AppContext';
import { AuthContextProvider } from '../data/contexts/AuthContext';
import { DbContextProvider } from '../data/contexts/DbContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <DbContextProvider>
      <AuthContextProvider>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </AuthContextProvider>
    </DbContextProvider>
  )
}

export default MyApp
