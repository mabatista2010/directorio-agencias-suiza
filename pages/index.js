// pages/index.js

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModernModal from '../components/ModernModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    variant: 'default'
  });

  // Función para abrir el modal con contenido específico
  const openModalWithContent = (title, content, variant = 'default') => {
    setModalContent({ title, content, variant });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Head>
        <title>Directorio de Agencias de Trabajo Temporal en Suiza</title>
        <meta name="description" content="Encuentra agencias de trabajo temporal en Suiza de manera fácil y rápida." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero Section */}
      <main className="flex-grow bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Encuentra tu Agencia Ideal</h2>
          <p className="text-lg sm:text-xl mb-8">
            Explora y encuentra las mejores agencias de trabajo temporal en Suiza con facilidad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/agencies" 
              className="w-full sm:w-auto bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition text-center"
            >
              Comienza Ahora
            </Link>
            <button
              onClick={() => openModalWithContent(
                'Cómo Funciona',
                [
                  {
                    title: 'Búsqueda',
                    content: (
                      <div className="space-y-2">
                        <p>Encuentra agencias fácilmente:</p>
                        <ul className="list-disc list-inside">
                          <li>Usa el mapa interactivo</li>
                          <li>Filtra por ubicación</li>
                          <li>Busca por especialidad</li>
                          <li>Encuentra las más cercanas</li>
                        </ul>
                      </div>
                    )
                  },
                  {
                    title: 'Filtros',
                    content: (
                      <div className="space-y-2">
                        <p>Personaliza tu búsqueda:</p>
                        <ul className="list-disc list-inside">
                          <li>Filtro por idiomas</li>
                          <li>Sectores específicos</li>
                          <li>Ubicación deseada</li>
                          <li>Horarios de atención</li>
                        </ul>
                      </div>
                    )
                  },
                  {
                    title: 'Contacto',
                    content: (
                      <div className="space-y-2">
                        <p>Conecta directamente:</p>
                        <ul className="list-disc list-inside">
                          <li>Datos de contacto completos</li>
                          <li>Direcciones exactas</li>
                          <li>Horarios actualizados</li>
                          <li>Links directos</li>
                        </ul>
                      </div>
                    )
                  }
                ],
                'info'
              )}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-blue-600 transition text-center"
            >
              Cómo Funciona
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => openModalWithContent(
              'Mapa Interactivo',
              <div className="space-y-4">
                <p className="font-medium text-gray-700">Nuestro mapa interactivo te permite:</p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                  <li>Ver todas las agencias en tu área</li>
                  <li>Filtrar por ubicación específica</li>
                  <li>Obtener direcciones exactas</li>
                  <li>Ver la distancia desde tu ubicación</li>
                  <li>Acceso a información en tiempo real</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  Utiliza la geolocalización para encontrar las agencias más cercanas a ti.
                </p>
              </div>,
              'map'
            )}
          >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Mapa Interactivo</h4>
              <p className="text-gray-600">
                Encuentra agencias en cualquier región de Suiza con facilidad usando nuestro mapa interactivo.
              </p>
            </div>

          {/* Feature 2 - Generador de CV */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => openModalWithContent(
              'Generador de CV',
              [
                {
                  title: 'Plantillas',
                  content: (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Diseños profesionales:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Plantillas modernas y elegantes</li>
                        <li>Diseños optimizados para ATS</li>
                        <li>Formatos adaptados a cada sector</li>
                      </ul>
                    </div>
                  )
                },
                {
                  title: 'Funciones',
                  content: (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Características avanzadas:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Editor intuitivo</li>
                        <li>Personalización completa</li>
                        <li>Vista previa en tiempo real</li>
                      </ul>
                    </div>
                  )
                },
                {
                  title: 'Exportación',
                  content: (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Múltiples formatos:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Descarga en PDF profesional</li>
                        <li>Optimizado para impresión</li>
                        <li>Compatibilidad garantizada</li>
                      </ul>
                    </div>
                  )
                }
              ],
              'cv'
            )}
          >
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Generador de CV</h4>
            <p className="text-gray-600">Crea tu CV profesional personalizado con múltiples plantillas y opciones de diseño.</p>
          </div>

          {/* Feature 3 - Centro de Ayuda/FAQ */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => openModalWithContent(
              'Consejos prácticos',
              [
                {
                  title: 'Guías y Recursos',
                  content: (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Información esencial:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Preguntas frecuentes</li>
                        <li>Consejos prácticos</li>
                        <li>Recursos útiles</li>
                        <li>Documentación necesaria</li>
                      </ul>
                    </div>
                  )
                },
                {
                  title: 'Temas Principales',
                  content: (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Áreas cubiertas:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Permisos de trabajo</li>
                        <li>Proceso de contratación</li>
                        <li>Requisitos legales</li>
                        <li>Trámites administrativos</li>
                        <li>Vida en Suiza</li>
                      </ul>
                    </div>
                  )
                }
              ],
              'info'
            )}
          >
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Preguntas frecuentes</h4>
            <p className="text-gray-600">
              Resuelve tus dudas con nuestra guía completa sobre trabajo temporal en Suiza y procesos de contratación.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">¿Listo para encontrar tu próxima oportunidad?</h3>
          <p className="text-lg mb-8">Explora nuestro directorio y conecta con las mejores agencias de trabajo temporal en Suiza.</p>
          <Link 
            href="/agencies" 
            className="w-full sm:w-auto bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition inline-block"
          >
            Explorar Agencias
          </Link>
        </div>
      </section>

      <Footer />

      {/* Modern Modal */}
      <ModernModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={modalContent.title}
        content={modalContent.content}
        variant={modalContent.variant}
      />
    </div>
  );
}