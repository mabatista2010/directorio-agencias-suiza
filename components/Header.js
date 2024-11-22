import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          aria-label="Ir a la página de inicio"
        >
          ETT Suisse
        </Link>

        {/* Botón de menú para móviles */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            // Icono de cerrar (X)
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icono de hamburguesa
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">
            Inicio
          </Link>
          <Link href="/agencies" className="text-gray-700 hover:text-blue-600 px-3 py-2">
            Ver Agencias
          </Link>
          <Link href="/cv-generator" className="text-gray-700 hover:text-blue-600 px-3 py-2">
            Crear CV
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2">
            Preguntas frecuentes
          </Link>
        </nav>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 px-6 py-4">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600 block py-2" onClick={() => setIsOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/agencies" className="text-gray-700 hover:text-blue-600 block py-2" onClick={() => setIsOpen(false)}>
                Ver Agencias
              </Link>
            </li>
            <li>
              <Link href="/cv-generator" className="text-gray-700 hover:text-blue-600 block py-2" onClick={() => setIsOpen(false)}>
                Crear CV
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 block py-2" onClick={() => setIsOpen(false)}>
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}