          import React, { useState, useRef } from 'react';
          import { Camera, Mail, Phone, MapPin, Linkedin, Calendar, Building, GraduationCap } from 'lucide-react';

          const CV_TEMPLATES = {
            modern: {
              name: "Moderno",
              preview: "/api/placeholder/200/280"
            },
            classic: {
              name: "Clásico",
              preview: "/api/placeholder/200/280"
            },
            professional: {
              name: "Profesional",
              preview: "/api/placeholder/200/280"
            }
          };

          const LANGUAGES_LEVELS = [
            "Principiante (A1)",
            "Básico (A2)",
            "Intermedio (B1)",
            "Intermedio Alto (B2)",
            "Avanzado (C1)",
            "Nativo (C2)"
          ];

          export default function CVGenerator() {
            const [selectedTemplate, setSelectedTemplate] = useState('modern');
            const [photo, setPhoto] = useState(null);
            const [formData, setFormData] = useState({
              personalInfo: {
                firstName: '',
                lastName: '',
                title: '',
                email: '',
                phone: '',
                address: '',
                linkedin: '',
                summary: ''
              },
              education: [],
              experience: [],
              skills: [],
              languages: [],
              certifications: []
            });

            const fileInputRef = useRef(null);

            const handlePhotoChange = (event) => {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPhoto(reader.result);
                };
                reader.readAsDataURL(file);
              }
            };

            const handleInputChange = (section, field, value) => {
              setFormData(prev => ({
                ...prev,
                [section]: {
                  ...prev[section],
                  [field]: value
                }
              }));
            };

            const addListItem = (section, item) => {
              setFormData(prev => ({
                ...prev,
                [section]: [...prev[section], item]
              }));
            };

            const removeListItem = (section, index) => {
              setFormData(prev => ({
                ...prev,
                [section]: prev[section].filter((_, i) => i !== index)
              }));
            };

            return (
              <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Panel de edición */}
                    <div className="lg:w-1/2 space-y-6">
                      {/* Selector de plantilla */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Elige una plantilla</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(CV_TEMPLATES).map(([id, template]) => (
                            <button
                              key={id}
                              onClick={() => setSelectedTemplate(id)}
                              className={`relative rounded-lg overflow-hidden transition-all ${
                                selectedTemplate === id ? 'ring-2 ring-blue-500' : ''
                              }`}
                            >
                              <img 
                                src={template.preview}
                                alt={template.name}
                                className="w-full h-40 object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                {template.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Información personal */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Información Personal</h2>

                        {/* Foto de perfil */}
                        <div className="mb-6 flex justify-center">
                          <div className="relative">
                            {photo ? (
                              <img
                                src={photo}
                                alt="Foto de perfil"
                                className="w-32 h-32 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
                            >
                              <Camera className="w-4 h-4" />
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

                        {/* Campos de información personal */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre
                            </label>
                            <input
                              type="text"
                              value={formData.personalInfo.firstName}
                              onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título Profesional
                          </label>
                          <input
                            type="text"
                            value={formData.personalInfo.title}
                            onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="ej. Desarrollador Full Stack"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resumen Profesional
                          </label>
                          <textarea
                            value={formData.personalInfo.summary}
                            onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={4}
                            placeholder="Breve descripción de tu perfil profesional..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.personalInfo.email}
                              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Experiencia Laboral */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Experiencia Laboral</h2>
                        {formData.experience.map((exp, index) => (
                          <div key={index} className="mb-4 p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-medium">{exp.position}</h3>
                                <p className="text-sm text-gray-600">{exp.company}</p>
                                <p className="text-sm text-gray-500">
                                  {exp.startDate} - {exp.endDate}
                                </p>
                              </div>
                              <button
                                onClick={() => removeListItem('experience', index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => addListItem('experience', {
                            position: '',
                            company: '',
                            startDate: '',
                            endDate: '',
                            description: ''
                          })}
                          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Agregar Experiencia
                        </button>
                      </div>

                      {/* Educación */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Educación</h2>
                        {formData.education.map((edu, index) => (
                          <div key={index} className="mb-4 p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-medium">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                                <p className="text-sm text-gray-500">
                                  {edu.startDate} - {edu.endDate}
                                </p>
                              </div>
                              <button
                                onClick={() => removeListItem('education', index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => addListItem('education', {
                            degree: '',
                            institution: '',
                            startDate: '',
                            endDate: ''
                          })}
                          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Agregar Educación
                        </button>
                      </div>

                      {/* Habilidades */}
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Habilidades</h2>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                            >
                              {skill}
                              <button
                                onClick={() => removeListItem('skills', index)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Agregar habilidad y presionar Enter"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const value = e.target.value.trim();
                                if (value) {
                                  addListItem('skills', value);
                                  e.target.value = '';
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vista previa del CV */}
                    <div className="lg:w-1/2 bg-white rounded-lg shadow p-8">
                      <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Vista Previa</h2>
                        <button
                          onClick={() => window.print()}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Descargar PDF
                        </button>
                      </div>

                      {/* Contenido del CV según la plantilla seleccionada */}
                      <div className="border rounded-lg p-8">
                        {/* Header */}
                        <div className="flex items-center space-x-6 mb-6">
                          {photo ? (
                            <img
                              src={photo}
                              alt="Foto de perfil"
                              className="w-24 h-24 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                              <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h1 className="text-2xl font-bold">
                              {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                            </h1>
                            <p className="text-lg text-gray-600">{formData.personalInfo.title}</p>
                          </div>
                        </div>

                        {/* Información de contacto */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {formData.personalInfo.email && (
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {formData.personalInfo.email}
                            </div>
                          )}
                          {formData.personalInfo.phone && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {formData.personalInfo.phone}
                            </div>
                          )}
                          {formData.personalInfo.address && (
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {formData.personalInfo.address}
                            </div>
                          )}
                          {formData.personalInfo.linkedin && (
                            <div className="flex items-center text-gray-600">
                              <Linkedin className="w-4 h-4 mr-2" />
                              {formData.personalInfo.linkedin}
                            </div>
                          )}
                        </div>

                        {/* Resumen profesional */}
                        {formData.personalInfo.summary && (
                          <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Perfil Profesional</h2>
                            <p className="text-gray-700">{formData.personalInfo.summary}</p>
                          </div>
                        )}

                        {/* Experiencia laboral */}
                        {formData.experience.length > 0 && (
                          <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3">Experiencia Laboral</h2>
                            <div className="space-y-4">
                              {formData.experience.map((exp, index) => (
                                <div key={index} className="border-l-2 border-gray-200 pl-4">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h3 className="font-medium">{exp.position}</h3>
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <Building className="w-4 h-4 mr-1" />
                                        {exp.company}
                                      </div>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      {exp.startDate} - {exp.endDate || 'Presente'}
                                    </div>
                                  </div>
                                  <p className="mt-2 text-gray-700">{exp.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Educación */}
                        {formData.education.length > 0 && (
                          <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3">Educación</h2>
                            <div className="space-y-4">
                              {formData.education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-gray-200 pl-4">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h3 className="font-medium">{edu.degree}</h3>
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <GraduationCap className="w-4 h-4 mr-1" />
                                        {edu.institution}
                                      </div>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      {edu.startDate} - {edu.endDate || 'Presente'}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Habilidades */}
                        {formData.skills.length > 0 && (
                          <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3">Habilidades</h2>
                            <div className="flex flex-wrap gap-2">
                              {formData.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Idiomas */}
                        {formData.languages.length > 0 && (
                          <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3">Idiomas</h2>
                            <div className="grid grid-cols-2 gap-4">
                              {formData.languages.map((lang, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="font-medium">{lang.name}</span>
                                  <span className="text-gray-600">{lang.level}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Vista Previa
                      </button>
                      <button
                        onClick={() => {
                          // Lógica para guardar/descargar el CV
                          const blob = new Blob([JSON.stringify(formData)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'mi-cv.json';
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Descargar CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
