import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../context/AuthContext';
import { ProductsProvider } from '../context/ProductsContext';

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </AuthProvider>
  )
};

export default MyApp;
