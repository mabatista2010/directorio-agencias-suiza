import React from 'react';

// Función para formatear los campos opcionales
const formatOptionalField = (key, value) => {
  if (!value || key === '') return value;

  // Si es freeText, devolver solo el valor sin formato adicional
  if (key === 'freeText') {
    return value;
  }

  let label;
  switch(key) {
    case 'drivingLicense':
      label = 'Permiso de conducir';
      return `${label}: ${Array.isArray(value) ? value.join(', ') : value}`;
    case 'birthDate':
      label = 'Fecha de nacimiento';
      return `${label}: ${value}`;
    case 'birthPlace':
      label = 'Lugar de nacimiento';
      return `${label}: ${value}`;
    case 'nationality':
      label = 'Nacionalidad';
      return `${label}: ${value}`;
    case 'maritalStatus':
      label = 'Estado civil';
      return `${label}: ${value}`;
    default:
      return `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
  }
};

export default function ModernTemplate({ data }) {
  return (
    <div className="bg-white p-8">
      <div className="flex justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl text-blue-600 mt-1">{data.personalInfo.title}</p>

          <div className="mt-4 space-y-2 text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                {data.personalInfo.address}
              </div>
            )}

            {/* Campos opcionales */}
            {Object.entries(data.optionalFields || {}).map(([key, value]) => {
              const formattedValue = formatOptionalField(key, value);
              if (!formattedValue) return null;

              let icon;
              switch(key) {
                case 'drivingLicense': icon = '🚗'; break;
                case 'birthDate': icon = '📅'; break;
                case 'birthPlace': icon = '📌'; break;
                case 'nationality': icon = '🌍'; break;
                case 'maritalStatus': icon = '❤️'; break;
                case 'linkedin': icon = '💼'; break;
                case 'website': icon = '🌐'; break;
                default: icon = '';
              }

              return (
                <div key={key} className="flex items-center">
                  <span className="mr-2">{icon}</span>
                  {formattedValue}
                </div>
              );
            })}
          </div>
        </div>

        {data.photo && (
          <div className="w-32 h-32">
            <img 
              src={data.photo} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}
      </div>

      {data.personalInfo.summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Perfil Profesional</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Experiencia Profesional</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <div className="text-gray-600 text-sm">
                  {exp.company} • {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Educación</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                <div className="text-gray-600 text-sm">
                  {edu.institution} • {edu.startDate} - {edu.endDate}
                </div>
                {edu.description && (
                  <p className="mt-2 text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.languages?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Idiomas</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{lang.language}</span>
                <span className="text-gray-600">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
