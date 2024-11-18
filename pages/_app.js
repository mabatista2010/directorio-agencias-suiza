// pages/_app.js
import { useState, useEffect } from 'react';
import '../styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import CookieBanner from '../components/CookieBanner';

function MyApp({ Component, pageProps }) {
  // Estado para controlar el montaje del banner
  const [mounted, setMounted] = useState(false);

  // Montar el banner solo después de la hidratación inicial
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      {mounted && <CookieBanner />}
    </>
  );
}

export default MyApp;