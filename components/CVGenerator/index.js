import React, { useState, useRef } from 'react';
import { ModernPDF, ClassicPDF, ProfessionalPDF } from './pdf-templates';
import ModernTemplate from './cv-templates/ModernTemplate';
import ClassicTemplate from './cv-templates/ClassicTemplate';
import ProfessionalTemplate from './cv-templates/ProfessionalTemplate';
import PDFDownloadButton from '../DynamicPDFDownloadButton'; 

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mei', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const templates = [
  {
    id: 'classic',
    name: 'Clásico',
    preview: '/images/classic-preview.png', // Asegúrate de que las imágenes estén en la carpeta public/images/
    component: ClassicTemplate,
    pdfComponent: ClassicPDF
  },
  {
    id: 'modern',
    name: 'Moderno',
    preview: '/images/modern-preview.png',
    component: ModernTemplate,
    pdfComponent: ModernPDF
  },
  {
    id: 'professional',
    name: 'Profesional',
    preview: '/images/professional-preview.png',
    component: ProfessionalTemplate,
    pdfComponent: ProfessionalPDF
  }
];

const YEARS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

const OPTIONAL_FIELDS = [
  { id: 'birthDate', label: 'Fecha de nacimiento', type: 'date' },
  { id: 'birthPlace', label: 'Lugar de nacimiento', type: 'text' },
  { 
    id: 'drivingLicense', 
    label: 'Permisos de conducir', 
    type: 'text', // Cambiado de 'multiselect' a 'text'
    placeholder: 'Ej: B, C1, D',  // Añadido placeholder
  },
  { id: 'nationality', label: 'Nacionalidad', type: 'text' },
  {
    id: 'maritalStatus', label: 'Estado civil', type: 'select',
    options: ['Célibataire', 'Marié/ée', 'Divorcié/ée', 'Veuf/veuve']
  },
  { id: 'linkedin', label: 'LinkedIn', type: 'url' },
  { id: 'website', label: 'Sitio web', type: 'url' },
  { 
    id: 'freeText', // mantenemos un id
    label: 'Información adicional', 
    type: 'textarea',
    placeholder: 'Añade cualquier información adicional que quieras incluir en tu CV...',
  }
];

const LANGUAGE_LEVELS = [
  'Básico', 'Intermedio', 'Avanzado', 'Nativo'
];

export default function CVGenerator() {
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    photo: null,
    enabledFields: [],
    optionalFields: {},
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: []
  });

  const fileInputRef = useRef(null);

  // Manejo de la foto de perfil
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar campos opcionales
  const toggleOptionalField = (fieldId) => {
    setFormData(prev => {
      const isEnabled = prev.enabledFields.includes(fieldId);
      return {
        ...prev,
        enabledFields: isEnabled
          ? prev.enabledFields.filter(id => id !== fieldId)
          : [...prev.enabledFields, fieldId],
        optionalFields: isEnabled
          ? Object.fromEntries(Object.entries(prev.optionalFields)
            .filter(([key]) => key !== fieldId))
          : { ...prev.optionalFields, [fieldId]: '' }
      };
    });
  };

  // Función para actualizar campos del formulario
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Funciones para manejar secciones de lista (experiencia, educación, etc.)
  const addListItem = (section, item) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const updateListItem = (section, index, updates) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, ...updates } : item
      )
    }));
  };

  const removeListItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Renderizar el formulario de experiencia
  const renderExperienceForm = () => (
    <div className="space-y-4">
      {formData.experience.map((exp, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puesto
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateListItem('experience', index, { position: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateListItem('experience', index, { company: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={exp.startMonth}
                  onChange={(e) => updateListItem('experience', index, { startMonth: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Mes</option>
                  {MONTHS.map((month, i) => (
                    <option key={i} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={exp.startYear}
                  onChange={(e) => updateListItem('experience', index, { startYear: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Año</option>
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de fin
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={exp.endMonth}
                  onChange={(e) => updateListItem('experience', index, { endMonth: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  disabled={exp.current}
                >
                  <option value="">Mes</option>
                  {MONTHS.map((month, i) => (
                    <option key={i} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={exp.endYear}
                  onChange={(e) => updateListItem('experience', index, { endYear: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  disabled={exp.current}
                >
                  <option value="">Año</option>
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateListItem('experience', index, { current: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Actualmente trabajando aquí</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => updateListItem('experience', index, { description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => removeListItem('experience', index)}
              className="px-4 py-2 text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => addListItem('experience', {
          position: '',
          company: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          current: false,
          description: ''
        })}
        className="w-full py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50"
      >
        + Añadir experiencia
      </button>
    </div>
  );

  // Renderizar el formulario de educación
  const renderEducationForm = () => (
    <div className="space-y-4">
      {formData.education.map((edu, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateListItem('education', index, { degree: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institución
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateListItem('education', index, { institution: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={edu.startMonth}
                  onChange={(e) => updateListItem('education', index, { startMonth: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Mes</option>
                  {MONTHS.map((month, i) => (
                    <option key={i} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={edu.startYear}
                  onChange={(e) => updateListItem('education', index, { startYear: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Año</option>
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de fin
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={edu.endMonth}
                  onChange={(e) => updateListItem('education', index, { endMonth: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Mes</option>
                  {MONTHS.map((month, i) => (
                    <option key={i} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={edu.endYear}
                  onChange={(e) => updateListItem('education', index, { endYear: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Año</option>
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={edu.description}
              onChange={(e) => updateListItem('education', index, { description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => removeListItem('education', index)}
              className="px-4 py-2 text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => addListItem('education', {
          degree: '',
          institution: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          description: ''
        })}
        className="w-full py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50"
      >
        + Añadir educación
      </button>
    </div>
  );

  // Renderizar el formulario de idiomas (añadido para completar el código)
  const renderLanguagesForm = () => (
    <div className="space-y-4">
      {formData.languages.map((lang, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idioma
              </label>
              <input
                type="text"
                value={lang.language}
                onChange={(e) => updateListItem('languages', index, { language: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nivel
              </label>
              <select
                value={lang.level}
                onChange={(e) => updateListItem('languages', index, { level: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Seleccionar nivel...</option>
                {LANGUAGE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => removeListItem('languages', index)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        onClick={() => addListItem('languages', { language: '', level: '' })}
        className="w-full py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50"
      >
        + Añadir idioma
      </button>
    </div>
  );

  // Componente principal
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de edición */}
          <div className="space-y-6">
            {/* Selector de plantilla */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Elige una plantilla</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setActiveTemplate(template.id)}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                      activeTemplate === template.id 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={template.preview}
                        alt={`Plantilla ${template.name}`}
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-medium p-3">
                        {template.name}
                      </p>
                    </div>
                    {/* Overlay cuando está seleccionado */}
                    {activeTemplate === template.id && (
                      <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                          Seleccionado
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Información Personal */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Información Personal</h2>

              {/* Foto de perfil */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  {formData.photo ? (
                    <img
                      src={formData.photo}
                      alt="Foto de perfil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Campos básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título Profesional
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.title}
                    onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ej. Desarrollador Full Stack"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.address}
                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Resumen profesional */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumen Profesional
                </label>
                <textarea
                  value={formData.personalInfo.summary}
                  onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Breve descripción de tu perfil profesional..."
                />
              </div>
            </div>

            {/* Campos opcionales */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Campos adicionales</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {OPTIONAL_FIELDS.map(field => (
                  <button
                    key={field.id}
                    onClick={() => toggleOptionalField(field.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.enabledFields.includes(field.id)
                        ? 'bg-blue-100 text-blue-800'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {formData.enabledFields.includes(field.id) ? '✓ ' : '+ '}
                    {field.label}
                  </button>
                ))}
              </div>
              {/* Campos habilitados */}
              <div className="space-y-4">
                {formData.enabledFields.map(fieldId => {
                  const field = OPTIONAL_FIELDS.find(f => f.id === fieldId);
                  return (
                    <div key={fieldId}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formData.optionalFields[fieldId] || ''}
                          onChange={(e) => handleInputChange('optionalFields', fieldId, e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seleccionar...</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'multiselect' ? (
                        <select
                          multiple
                          value={formData.optionalFields[fieldId] || []}
                          onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                            handleInputChange('optionalFields', fieldId, selectedOptions);
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={formData.optionalFields[fieldId] || ''}
                          onChange={(e) => handleInputChange('optionalFields', fieldId, e.target.value)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-y"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData.optionalFields[fieldId] || ''}
                          onChange={(e) => handleInputChange('optionalFields', fieldId, e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Secciones desplegables */}
            <div className="space-y-4">
              {/* Experiencia */}
              <div className="bg-white rounded-lg shadow">
                <button
                  onClick={() => setActiveSection(activeSection === 'experience' ? null : 'experience')}
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                >
                  <span>Experiencia Laboral</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      activeSection === 'experience' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSection === 'experience' && (
                  <div className="p-6 border-t">
                    {renderExperienceForm()}
                  </div>
                )}
              </div>

              {/* Educación */}
              <div className="bg-white rounded-lg shadow">
                <button
                  onClick={() => setActiveSection(activeSection === 'education' ? null : 'education')}
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                >
                  <span>Educación</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      activeSection === 'education' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSection === 'education' && (
                  <div className="p-6 border-t">
                    {renderEducationForm()}
                  </div>
                )}
              </div>

              {/* Habilidades */}
              <div className="bg-white rounded-lg shadow">
                <button
                  onClick={() => setActiveSection(activeSection === 'skills' ? null : 'skills')}
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                >
                  <span>Habilidades</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      activeSection === 'skills' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSection === 'skills' && (
                  <div className="p-6 border-t">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Escribe una habilidad y presiona Enter"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = e.target.value.trim();
                            if (value && !formData.skills.includes(value)) {
                              setFormData(prev => ({
                                ...prev,
                                skills: [...prev.skills, value]
                              }));
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                skills: prev.skills.filter((_, i) => i !== index)
                              }));
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Idiomas */}
              <div className="bg-white rounded-lg shadow">
                <button
                  onClick={() => setActiveSection(activeSection === 'languages' ? null : 'languages')}
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                >
                  <span>Idiomas</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      activeSection === 'languages' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSection === 'languages' && (
                  <div className="p-6 border-t">
                    {renderLanguagesForm()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vista previa del CV */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Vista Previa</h2>
                <PDFDownloadButton
                  document={
                    activeTemplate === 'modern' ? <ModernPDF data={formData} /> :
                    activeTemplate === 'classic' ? <ClassicPDF data={formData} /> :
                    <ProfessionalPDF data={formData} />
                  }
                  fileName={`CV-${formData.personalInfo.firstName || 'usuario'}-${formData.personalInfo.lastName || 'apellido'}.pdf`}
                />
              </div>
              <div className="p-8 max-h-[800px] overflow-y-auto">
                {activeTemplate === 'modern' && <ModernTemplate data={formData} />}
                {activeTemplate === 'classic' && <ClassicTemplate data={formData} />}
                {activeTemplate === 'professional' && <ProfessionalTemplate data={formData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
