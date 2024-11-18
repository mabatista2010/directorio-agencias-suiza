import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const LIBRARIES = ["places"];

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 46.8182,
  lng: 8.2275
};

const mapOptions = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  gestureHandling: 'greedy'
};

const GoogleMapComponent = ({ agencies }) => {
  const router = useRouter();
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: LIBRARIES
  });

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const getMarkerIcon = useCallback((agency) => {
    if (!isLoaded) return null;

    if (agency.logotipo_url && agency.logotipo_url !== 'EMPTY' && agency.logotipo_url !== 'NULL') {
      return {
        url: agency.logotipo_url,
        scaledSize: new window.google.maps.Size(30, 30)
      };
    }

    return {
      path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 6,
      fillColor: "#E71D36",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#FFFFFF"
    };
  }, [isLoaded]);

  // Función para calcular la posición del modal en desktop
  const calculateModalPosition = useCallback((event, map) => {
    if (!containerRef.current || !mapRef.current || isMobile) return null;

    const scale = Math.pow(2, map.getZoom());
    const projection = map.getProjection();

    if (!projection) return null;

    const latLng = event.latLng;
    const point = projection.fromLatLngToPoint(latLng);
    const centerPoint = projection.fromLatLngToPoint(map.getCenter());
    const containerRect = containerRef.current.getBoundingClientRect();

    const pixelX = ((point.x - centerPoint.x) * scale) + (containerRect.width / 2);
    const pixelY = ((point.y - centerPoint.y) * scale) + (containerRect.height / 2);

    const modalHeight = 280;
    const offsetY = 10;

    return {
      x: pixelX,
      y: pixelY - modalHeight - offsetY
    };
  }, [isMobile]);

  const handleMarkerClick = useCallback((agency, event) => {
    if (isMobile) {
      setSelectedAgency(agency);
    } else if (mapRef.current) {
      const position = calculateModalPosition(event, mapRef.current);
      if (position) {
        setModalPosition(position);
        setSelectedAgency(agency);
      }
    }
  }, [calculateModalPosition, isMobile]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(pos);
          map.panTo(pos);
          map.setZoom(12);
        },
        () => {
          map.panTo(center);
        }
      );
    }
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Cerrar el modal al hacer clic en el mapa
  const handleMapClick = useCallback(() => {
    setSelectedAgency(null);
  }, []);

  if (loadError) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error cargando el mapa: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
        Cargando mapa...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px]" ref={containerRef}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          ...mapOptions,
          zoomControl: !isMobile,
          streetViewControl: !isMobile,
          mapTypeControl: !isMobile,
        }}
      >
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
            title="Tu ubicación"
          />
        )}

        {agencies?.map((agency) => (
          <MarkerF
            key={agency.id}
            position={{
              lat: Number(agency.latitud),
              lng: Number(agency.longitud)
            }}
            onClick={(e) => handleMarkerClick(agency, e)}
            icon={getMarkerIcon(agency)}
          />
        ))}

        {selectedAgency && (
          <div 
            className={`absolute z-50 bg-white rounded-lg shadow-xl transition-all duration-200 ${
              isMobile 
                ? 'left-1/2 bottom-4 -translate-x-1/2 w-[90%] max-w-sm'
                : 'w-[350px] transform -translate-x-1/2'
            }`}
            style={!isMobile ? {
              left: `${modalPosition.x}px`,
              top: `${modalPosition.y}px`
            } : undefined}
          >
            <div className="relative z-10 p-4 bg-white rounded-lg">
              {/* Flecha inferior - solo en desktop */}
              {!isMobile && (
                <div className="absolute bottom-0 left-1/2 -mb-2 transform -translate-x-1/2 translate-y-full">
                  <div className="border-8 border-transparent border-t-white"></div>
                </div>
              )}

              {selectedAgency.logotipo_url && 
               selectedAgency.logotipo_url !== 'EMPTY' && 
               selectedAgency.logotipo_url !== 'NULL' && (
                <img 
                  src={selectedAgency.logotipo_url} 
                  alt={`Logo ${selectedAgency.nombre}`}
                  className="h-12 mb-2 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{selectedAgency.nombre}</h3>
              <p className="text-sm text-gray-600 mb-1">{selectedAgency.direccion}</p>
              <p className="text-sm text-gray-600 mb-1">Tel: {selectedAgency.telefono}</p>
              <p className="text-sm text-gray-600 mb-3">Idiomas: {selectedAgency.idiomas}</p>

              <div className="flex justify-between mt-2 space-x-2">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedAgency.direccion)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 text-sm transition-colors"
                >
                  Cómo llegar
                </a>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    router.push(`/agency/${selectedAgency.id}`).finally(() => setIsLoading(false));
                  }}
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Cargando...' : 'Ver más'}
                </button>
              </div>
            </div>
          </div>
        )}
      </GoogleMap>

      <button
        onClick={() => {
          if (userLocation && mapRef.current) {
            mapRef.current.panTo(userLocation);
            mapRef.current.setZoom(12);
          } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                setUserLocation(pos);
                mapRef.current?.panTo(pos);
                mapRef.current?.setZoom(12);
              }
            );
          }
        }}
        className="absolute bottom-20 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
};

export default GoogleMapComponent;