// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Directorio de Agencias Suiza. Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/privacy" 
              className="hover:text-white transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-white transition-colors"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}