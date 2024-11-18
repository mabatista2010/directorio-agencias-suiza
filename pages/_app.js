// pages/_app.js
import { useState, useEffect } from 'react';
import CookieBanner from '../components/CookieBanner';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cargar el CSS de Quill solo en el cliente
    if (typeof window !== 'undefined') {
      import('react-quill/dist/quill.snow.css');
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      {mounted && <CookieBanner />}
    </>
  );
}

export default MyApp;