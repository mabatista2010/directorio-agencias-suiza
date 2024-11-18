// components/CookieBanner.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Usar useEffect para manejar la hidratación del cliente
  useEffect(() => {
    setIsClient(true);
    // Verificar el consentimiento después de que el componente se monte en el cliente
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted');
      setShowBanner(false);
      // Aquí puedes activar scripts de análisis o tracking si es necesario
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  const declineCookies = () => {
    try {
      localStorage.setItem('cookieConsent', 'declined');
      setShowBanner(false);
      // Aquí puedes desactivar scripts de análisis o tracking si es necesario
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  // No renderizar nada durante la hidratación para evitar discrepancias
  if (!isClient) return null;
  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 animate-slide-up" 
      style={{
        animation: 'slideUp 0.5s ease-out'
      }}
    >
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-gray-700">
            <p>
              Este sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia. 
              Al hacer clic en "Aceptar cookies" o continuar navegando, aceptas nuestra{' '}
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                política de privacidad
              </Link>{' '}
              y el uso de cookies.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={declineCookies}
              className="min-w-[100px] px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={acceptCookies}
              className="min-w-[100px] px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Aceptar cookies
            </button>
          </div>
        </div>
      </div>

      {/* Añadir estilos de animación inline */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}