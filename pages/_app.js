// pages/_app.js
import { useState, useEffect } from 'react';
import Script from 'next/script';
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7676657640751958"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
      {mounted && <CookieBanner />}
    </>
  );
}

export default MyApp;