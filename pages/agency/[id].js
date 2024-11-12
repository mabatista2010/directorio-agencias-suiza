import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';

export default function AgencyDetail({ agency }) {
  const router = useRouter();
  const [showCallConfirm, setShowCallConfirm] = useState(false);

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  if (!agency) {
    return <div>No se encontró la agencia</div>;
  }

  const handlePhoneClick = (e) => {
    e.preventDefault();
    setShowCallConfirm(true);
  };

  const handleCall = () => {
    window.location.href = `tel:${agency.telefono.replace(/\s/g, '')}`;
    setShowCallConfirm(false);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Head>
        <title>{agency.nombre} - Directorio de Agencias</title>
        <meta name="description" content={`Información detallada sobre ${agency.nombre}`} />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Encabezado con logo */}
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center space-x-4">
            {agency.logotipo_url && agency.logotipo_url !== 'EMPTY' && agency.logotipo_url !== 'NULL' ? (
              <img 
                src={agency.logotipo_url} 
                alt={`Logo de ${agency.nombre}`}
                className="h-16 w-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">
                  {agency.nombre.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{agency.nombre}</h1>
              <p className="text-sm text-gray-500">Agencia de trabajo temporal</p>
            </div>
          </div>

          {/* Información principal */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Información de contacto</h2>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {agency.direccion}
                  </p>
                  <button
                    onClick={handlePhoneClick}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors w-full text-left"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    {agency.telefono}
                  </button>
                  {agency.email && (
                    <p className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      {agency.email}
                    </p>
                  )}
                  {agency.sitio_web && (
                    <a 
                      href={agency.sitio_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Visitar sitio web
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Idiomas</h2>
                <div className="flex flex-wrap gap-2">
                  {agency.idiomas.split(',').map((idioma, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {idioma.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {agency.horarios_atencion && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Horario de atención</h2>
                  <p className="text-gray-600">{agency.horarios_atencion}</p>
                </div>
              )}
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              {agency.area_especializacion && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Sectores de especialización</h2>
                  <div className="flex flex-wrap gap-2">
                    {agency.area_especializacion.split(',').map((sector, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {sector.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold mb-2">Ubicación</h2>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(agency.direccion)}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Nueva sección de Información Adicional */}
          {agency.informacion_adicional && (
            <div className="px-6 py-4 border-t">
              <h2 className="text-lg font-semibold mb-2">Información Adicional</h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">
                  {agency.informacion_adicional}
                </p>
              </div>
            </div>
          )}

          {/* Botón para volver */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Volver al mapa
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de confirmación de llamada */}
      {showCallConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmar llamada</h3>
            <p className="text-gray-600 mb-6">
              ¿Deseas llamar al número {agency.telefono}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCallConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleCall}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Llamar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  const { data: agency, error } = await supabase
    .from('agencias')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !agency) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      agency
    }
  };
}
