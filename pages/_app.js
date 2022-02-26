import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../context/AuthContext';

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
};

export default MyApp;
