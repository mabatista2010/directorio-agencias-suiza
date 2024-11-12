import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import AgencyForm from '../components/AgencyForm';
import SuccessMessage from '../components/SuccessMessage'; // Importación añadida

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

// Componente TableHeader para los filtros
const TableHeader = ({ title, options, selectedFilters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
        >
          <span>{title}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-56 bg-white rounded-lg shadow-lg">
            <div className="p-2">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 border rounded mb-2"
              />
              {filteredOptions.map((option) => (
                <label key={option} className="flex items-center p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(option)}
                    onChange={() => onFilterChange(
                      selectedFilters.includes(option)
                        ? selectedFilters.filter(f => f !== option)
                        : [...selectedFilters, option]
                    )}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </th>
  );
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Añadir nuevo estado para la visibilidad
  const [messageVisible, setMessageVisible] = useState(true);

  // Estados para filtros y confirmación de eliminación
  const [filters, setFilters] = useState({
    nombre: [],
    sociedad: [],
    direccion: [],
    telefono: [],
    idiomas: []
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [agencyToDelete, setAgencyToDelete] = useState(null);

  // Cargar agencias existentes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAgencies();
    }
  }, [isAuthenticated]);

  const fetchAgencies = async () => {
    const { data, error } = await supabase
      .from('agencias')
      .select('*')
      .order('nombre');

    if (error) {
      console.error('Error fetching agencies:', error);
      setError('Error al obtener las agencias.');
    } else {
      setAgencies(data);
    }
  };

  // Verificar autenticación al cargar la página
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (selectedAgency) {
        // Actualizar agencia existente
        const { error: updateError } = await supabase
          .from('agencias')
          .update(formData)
          .eq('id', selectedAgency.id);

        if (updateError) throw updateError;
        setSuccessMessage('Agencia actualizada exitosamente');
      } else {
        // Crear nueva agencia
        const { error: insertError } = await supabase
          .from('agencias')
          .insert([formData]);

        if (insertError) throw insertError;
        setSuccessMessage('Agencia agregada exitosamente');
      }

      // Recargar lista de agencias
      await fetchAgencies();
      setShowForm(false);
      setSelectedAgency(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al guardar la agencia: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (agency) => {
    setSelectedAgency(agency);
    setShowForm(true);
    setError('');
    setSuccessMessage('');
  };

  const handleDeleteClick = (agency) => {
    setAgencyToDelete(agency);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const { error } = await supabase
        .from('agencias')
        .delete()
        .eq('id', agencyToDelete.id);

      if (error) throw error;

      setSuccessMessage('Agencia eliminada exitosamente');
      await fetchAgencies();
      setShowDeleteConfirm(false);
      setAgencyToDelete(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al eliminar la agencia: ' + error.message);
    }
  };

  // Función para obtener valores únicos para los filtros
  const getUniqueValues = (field) => 
    [...new Set(agencies.map(agency => agency[field]))].filter(Boolean).sort();

  // Filtrar agencias basado en los filtros seleccionados
  const filteredAgencies = agencies.filter(agency => {
    return Object.entries(filters).every(([field, selectedFilters]) => {
      if (selectedFilters.length === 0) return true;
      return selectedFilters.some(filter => 
        agency[field]?.toLowerCase().includes(filter.toLowerCase())
      );
    });
  });

  // Actualizar el useEffect para manejar la visibilidad del mensaje
  useEffect(() => {
    if (successMessage) {
      setMessageVisible(true); // Asegurar que el mensaje es visible cuando cambia

      // Timer para iniciar el fade out
      const fadeTimer = setTimeout(() => {
        setMessageVisible(false);
      }, 2500); // Inicia el fade out después de 2.5 segundos

      // Timer para eliminar el mensaje
      const removeTimer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Elimina el mensaje después de 3 segundos

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [successMessage]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Acceso Administrativo
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Acceder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Panel Administrativo - Agencias</title>
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Barra superior */}
        <div className="px-4 py-4 sm:px-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Panel Administrativo
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setSelectedAgency(null);
                setError('');
                setSuccessMessage('');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              {showForm ? 'Ver Lista' : 'Nueva Agencia'}
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('adminAuth');
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Mensajes de error/éxito */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {successMessage && (
          <SuccessMessage
            message={successMessage}
            visible={messageVisible}
          />
        )}

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow">
          {showForm ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedAgency ? 'Editar Agencia' : 'Nueva Agencia'}
              </h2>
              <AgencyForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                initialData={selectedAgency}
              />
            </div>
          ) : (
            <div className="relative">
              {/* Contenedor de scroll horizontal con indicadores de sombra */}
              <div className="relative">
                <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                  {/* Indicador de scroll derecha/izquierda */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"
                    style={{ opacity: '0.8' }}
                  />
                  <div
                    className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"
                    style={{ opacity: '0.8' }}
                  />

                  {/* Tabla con ancho mínimo para asegurar scroll en pantallas pequeñas */}
                  <div className="min-w-max">
                    <table className="w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0 z-20">
                        <tr>
                          <TableHeader
                            title="Nombre"
                            options={getUniqueValues('nombre')}
                            selectedFilters={filters.nombre}
                            onFilterChange={(newFilters) =>
                              setFilters((prev) => ({ ...prev, nombre: newFilters }))
                            }
                          />
                          <TableHeader
                            title="Sociedad"
                            options={getUniqueValues('sociedad')}
                            selectedFilters={filters.sociedad}
                            onFilterChange={(newFilters) =>
                              setFilters((prev) => ({ ...prev, sociedad: newFilters }))
                            }
                          />
                          <TableHeader
                            title="Dirección"
                            options={getUniqueValues('direccion')}
                            selectedFilters={filters.direccion}
                            onFilterChange={(newFilters) =>
                              setFilters((prev) => ({ ...prev, direccion: newFilters }))
                            }
                          />
                          <TableHeader
                            title="Teléfono"
                            options={getUniqueValues('telefono')}
                            selectedFilters={filters.telefono}
                            onFilterChange={(newFilters) =>
                              setFilters((prev) => ({ ...prev, telefono: newFilters }))
                            }
                          />
                          <TableHeader
                            title="Idiomas"
                            options={getUniqueValues('idiomas')}
                            selectedFilters={filters.idiomas}
                            onFilterChange={(newFilters) =>
                              setFilters((prev) => ({ ...prev, idiomas: newFilters }))
                            }
                          />
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAgencies.map((agency) => (
                          <tr key={agency.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {agency.nombre}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {agency.sociedad}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {agency.direccion}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {agency.telefono}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {agency.idiomas}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 sticky right-0 bg-white">
                              <button
                                onClick={() => handleEdit(agency)}
                                className="text-blue-600 hover:text-blue-900">
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteClick(agency)}
                                className="text-red-600 hover:text-red-900">
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar la agencia{' '}
              <span className="font-semibold">{agencyToDelete?.nombre}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
