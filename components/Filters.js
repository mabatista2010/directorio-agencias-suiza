import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// Opciones de Idiomas y Sectores (puedes completarlas según tus necesidades)
const IDIOMAS_OPCIONES = [
  'Francés',
  'Inglés',
  'Español',
  'Italiano',
  'Portugués',
  'Ruso'
];

const SECTORES_OPCIONES = [
  'Construcción',
  'Logística',
  'Paisajismo',
  'Hostelería',
  'Medical',
  'Transporte',
  'Producción',
  'Administración',
  'Informática',
  'Comercial/Ventas',
  'Marketing',
  'Eventos',
  'Relojería',
  'Mecánica'
];

// Componente FilterButton
const FilterButton = ({ selected, type, onClick, isActive }) => {
  // Función para formatear el texto de las selecciones
  const getSelectionText = () => {
    if (selected.length === 0) {
      switch (type) {
        case 'sociedades':
          return 'Sociedad';
        case 'ciudades':
          return 'Ciudad';
        case 'idiomas':
          return 'Idiomas';
        case 'sectores':
          return 'Sector';
        default:
          return '';
      }
    }

    // Mostrar las opciones seleccionadas
    return selected.join(', ');
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full min-h-[40px] bg-white px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-left transition-all duration-200 ${
        selected.length > 0 ? 'text-blue-600 border-blue-500' : 'text-gray-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="block truncate pr-2">{getSelectionText()}</span>
        <span className="shrink-0">
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${
              isActive ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </button>
  );
};

const Filters = ({ onFiltersChange }) => {
  const [ciudades, setCiudades] = useState([]);
  const [sociedades, setSociedades] = useState([]);
  const [selectedCiudades, setSelectedCiudades] = useState([]);
  const [selectedSociedades, setSelectedSociedades] = useState([]); // Cambiado a array
  const [selectedIdiomas, setSelectedIdiomas] = useState([]);
  const [selectedSectores, setSelectedSectores] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Función para cerrar todos los dropdowns
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  // Manejar clics fuera de los desplegables para cerrarlos
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Cargar ciudades y sociedades desde Supabase con procesamiento mejorado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: agenciasData, error } = await supabase
          .from('agencias')
          .select('direccion, sociedad');

        if (error) throw error;

        // Procesar ciudades
        const uniqueCities = [...new Set(agenciasData
          .map(agency => {
            const addressParts = agency.direccion?.split(',');
            return addressParts ? addressParts[addressParts.length - 1]?.trim() : null;
          })
          .filter(Boolean)
        )].sort();

        // Procesar sociedades - asegurando que sean únicas y eliminando duplicados de manera insensible a mayúsculas
        const uniqueSociedades = [...new Set(agenciasData
          .map(agency => agency.sociedad?.trim())
          .filter(Boolean)
        )].sort();

        setCiudades(uniqueCities);
        setSociedades(uniqueSociedades);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios en los filtros
  const handleFilterChange = (updatedFilters) => {
    onFiltersChange(updatedFilters);
  };

  // Manejar cambios en las sociedades seleccionadas
  const handleSociedadChange = (sociedad) => {
    setSelectedSociedades(prev => {
      const newSelection = prev.includes(sociedad)
        ? prev.filter(s => s !== sociedad)
        : [...prev, sociedad];

      handleFilterChange({
        ciudades: selectedCiudades,
        sociedades: newSelection,
        idiomas: selectedIdiomas,
        sectores: selectedSectores
      });

      return newSelection;
    });
  };

  // Manejar cambios en las demás selecciones (ciudades, idiomas, sectores)
  const handleCheckboxChange = (type, item) => {
    let newSelection;
    switch (type) {
      case 'ciudades':
        newSelection = selectedCiudades.includes(item)
          ? selectedCiudades.filter(c => c !== item)
          : [...selectedCiudades, item];
        setSelectedCiudades(newSelection);
        break;
      case 'idiomas':
        newSelection = selectedIdiomas.includes(item)
          ? selectedIdiomas.filter(i => i !== item)
          : [...selectedIdiomas, item];
        setSelectedIdiomas(newSelection);
        break;
      case 'sectores':
        newSelection = selectedSectores.includes(item)
          ? selectedSectores.filter(s => s !== item)
          : [...selectedSectores, item];
        setSelectedSectores(newSelection);
        break;
      default:
        break;
    }

    handleFilterChange({
      ciudades: type === 'ciudades' ? newSelection : selectedCiudades,
      sociedades: selectedSociedades,
      idiomas: type === 'idiomas' ? newSelection : selectedIdiomas,
      sectores: type === 'sectores' ? newSelection : selectedSectores
    });
  };

  // Alternar la apertura/cierre de los dropdowns
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Filtro de Sociedades */}
      <div className="relative dropdown-container">
        <FilterButton
          selected={selectedSociedades}
          type="sociedades"
          onClick={() => toggleDropdown('sociedades')}
          isActive={activeDropdown === 'sociedades'}
        />

        {activeDropdown === 'sociedades' && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoadingData ? (
              <div className="px-4 py-2">Cargando sociedades...</div>
            ) : (
              <div className="p-2">
                {sociedades.map((sociedad) => (
                  <label
                    key={sociedad}
                    className="flex items-center px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSociedades.includes(sociedad)}
                      onChange={() => handleSociedadChange(sociedad)}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{sociedad}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filtro de Ciudades */}
      <div className="relative dropdown-container">
        <FilterButton
          selected={selectedCiudades}
          type="ciudades"
          onClick={() => toggleDropdown('ciudades')}
          isActive={activeDropdown === 'ciudades'}
        />
        {activeDropdown === 'ciudades' && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoadingData ? (
              <div className="px-4 py-2">Cargando ciudades...</div>
            ) : (
              ciudades.map((ciudad) => (
                <label key={ciudad} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCiudades.includes(ciudad)}
                    onChange={() => handleCheckboxChange('ciudades', ciudad)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{ciudad}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Filtro de Idiomas */}
      <div className="relative dropdown-container">
        <FilterButton
          selected={selectedIdiomas}
          type="idiomas"
          onClick={() => toggleDropdown('idiomas')}
          isActive={activeDropdown === 'idiomas'}
        />
        {activeDropdown === 'idiomas' && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="px-4 py-2">
              {IDIOMAS_OPCIONES.map((idioma) => (
                <label key={idioma} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIdiomas.includes(idioma)}
                    onChange={() => handleCheckboxChange('idiomas', idioma)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{idioma}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filtro de Sectores */}
      <div className="relative dropdown-container">
        <FilterButton
          selected={selectedSectores}
          type="sectores"
          onClick={() => toggleDropdown('sectores')}
          isActive={activeDropdown === 'sectores'}
        />
        {activeDropdown === 'sectores' && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="px-4 py-2">
              {SECTORES_OPCIONES.map((sector) => (
                <label key={sector} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSectores.includes(sector)}
                    onChange={() => handleCheckboxChange('sectores', sector)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{sector}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
