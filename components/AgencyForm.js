import { useState, useEffect, useRef } from 'react';

const IDIOMAS_OPCIONES = [
  'Francés',
  'Alemán',
  'Inglés',
  'Español',
  'Italiano',
  'Portugués',
  'Ruso'
];

const SECTORES_OPCIONES = [
  'Construcción',
  'Limipieza',
  'Logística',
  'Paisajismo',
  'Hostelería',
  'Medical',
  'Transporte',
  'Producción',
  'Administración',
  'Informática',
  'Comercial/Ventas',
  'Finanzas',
  'Marketing',
  'Eventos',
  'Relojería',
  'Mecánica'
];

export default function AgencyForm({ onSubmit, isLoading, initialData = null }) {
  const [formData, setFormData] = useState({
    nombre: '',
    sociedad: '',
    direccion: '',
    telefono: '',
    email: '',
    sitio_web: '',
    idiomas: [],
    area_especializacion: [],
    horarios_atencion: '',
    latitud: '',
    longitud: '',
    logotipo_url: '',
    informacion_adicional: '' // Nuevo campo agregado
  });

  const [showIdiomasDropdown, setShowIdiomasDropdown] = useState(false);
  const [showSectoresDropdown, setShowSectoresDropdown] = useState(false);

  // Referencias para los contenedores de los dropdowns
  const idiomasRef = useRef(null);
  const sectoresRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        sociedad: initialData.sociedad || '',
        idiomas: Array.isArray(initialData.idiomas) 
          ? initialData.idiomas 
          : initialData.idiomas?.split(',').map(i => i.trim()) || [],
        area_especializacion: Array.isArray(initialData.area_especializacion)
          ? initialData.area_especializacion
          : initialData.area_especializacion?.split(',').map(s => s.trim()) || [],
      });
    }
  }, [initialData]);

  // Manejador de clics fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (idiomasRef.current && !idiomasRef.current.contains(event.target)) {
        setShowIdiomasDropdown(false);
      }
      if (sectoresRef.current && !sectoresRef.current.contains(event.target)) {
        setShowSectoresDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleIdioma = (idioma) => {
    setFormData(prev => ({
      ...prev,
      idiomas: prev.idiomas.includes(idioma)
        ? prev.idiomas.filter(i => i !== idioma)
        : [...prev.idiomas, idioma]
    }));
  };

  const toggleSector = (sector) => {
    setFormData(prev => ({
      ...prev,
      area_especializacion: prev.area_especializacion.includes(sector)
        ? prev.area_especializacion.filter(s => s !== sector)
        : [...prev.area_especializacion, sector]
    }));
  };

  const validateForm = () => {
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSubmit = {
      ...formData,
      idiomas: formData.idiomas.join(', '),
      area_especializacion: formData.area_especializacion.join(', '),
    };

    await onSubmit(dataToSubmit);
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de querer limpiar el formulario?')) {
      setFormData({
        nombre: '',
        sociedad: '',
        direccion: '',
        telefono: '',
        email: '',
        sitio_web: '',
        idiomas: [],
        area_especializacion: [],
        horarios_atencion: '',
        latitud: '',
        longitud: '',
        logotipo_url: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo Sociedad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sociedad
          </label>
          <input
            type="text"
            name="sociedad"
            value={formData.sociedad}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nombre oficial de la empresa"
          />
        </div>

        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Agencia
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Sitio Web */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sitio Web
          </label>
          <input
            type="url"
            name="sitio_web"
            value={formData.sitio_web}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Horarios de Atención */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horarios de Atención
          </label>
          <input
            type="text"
            name="horarios_atencion"
            value={formData.horarios_atencion}
            onChange={handleChange}
            placeholder="Ej: Lunes a jueves: 08:00-12:00, 13:30-17:30"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Idiomas Dropdown */}
        <div className="relative" ref={idiomasRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idiomas
          </label>
          <button
            type="button"
            onClick={() => setShowIdiomasDropdown(!showIdiomasDropdown)}
            className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-left"
          >
            {formData.idiomas.length > 0 
              ? `${formData.idiomas.length} idioma(s) seleccionado(s)`
              : 'Seleccionar idiomas'}
          </button>
          {showIdiomasDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              {IDIOMAS_OPCIONES.map(idioma => (
                <label
                  key={idioma}
                  className="flex items-center px-4 py-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.idiomas.includes(idioma)}
                    onChange={() => toggleIdioma(idioma)}
                    className="mr-2"
                  />
                  {idioma}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sectores Dropdown */}
        <div className="relative" ref={sectoresRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Áreas de Especialización
          </label>
          <button
            type="button"
            onClick={() => setShowSectoresDropdown(!showSectoresDropdown)}
            className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-left"
          >
            {formData.area_especializacion.length > 0 
              ? `${formData.area_especializacion.length} sector(es) seleccionado(s)`
              : 'Seleccionar sectores'}
          </button>
          {showSectoresDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {SECTORES_OPCIONES.map(sector => (
                <label
                  key={sector}
                  className="flex items-center px-4 py-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.area_especializacion.includes(sector)}
                    onChange={() => toggleSector(sector)}
                    className="mr-2"
                  />
                  {sector}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Coordenadas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitud
          </label>
          <input
            type="number"
            step="any"
            name="latitud"
            value={formData.latitud}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitud
          </label>
          <input
            type="number"
            step="any"
            name="longitud"
            value={formData.longitud}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Logo URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL del Logo
          </label>
          <input
            type="url"
            name="logotipo_url"
            value={formData.logotipo_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formData.logotipo_url && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
              <img
                src={formData.logotipo_url}
                alt="Vista previa del logo"
                className="h-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const errorMsg = e.target.nextSibling;
                  if (errorMsg) {
                    errorMsg.style.display = 'block';
                  }
                }}
              />
              <p className="text-sm text-red-500 hidden">Error al cargar la imagen</p>
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Información Adicional
        </label>
        <textarea
          name="informacion_adicional"
          value={formData.informacion_adicional}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Información adicional sobre la agencia..."
        />
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          Limpiar
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Guardando...
            </span>
          ) : (
            'Guardar Agencia'
          )}
        </button>
      </div>
    </form>
  );
}
