import React from 'react';

// Función para formatear campos opcionales en francés
const formatOptionalField = (key, value) => {
  if (!value) return null;

  let label;
  switch(key) {
    case 'drivingLicense':
      label = 'Permis de conduire';
      break;
    case 'birthDate':
      label = 'Date de naissance';
      break;
    case 'birthPlace':
      label = 'Lieu de naissance';
      break;
    case 'nationality':
      label = 'Nationalité';
      break;
    case 'maritalStatus':
      label = 'État civil';
      break;
    default:
      label = key.charAt(0).toUpperCase() + key.slice(1);
  }

  return `${label}: ${Array.isArray(value) ? value.join(', ') : value}`;
};

export default function ClassicTemplate({ data }) {
  return (
    <div className="bg-white p-6 max-w-4xl mx-auto shadow-lg">
      {/* Header optimizado */}
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
        {/* Información Personal */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold uppercase text-gray-900">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-lg text-gray-700">{data.personalInfo.title}</p>
        </div>

        {/* Foto Opcional */}
        {data.photo && (
          <img
            src={data.photo}
            alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
            className="w-24 h-24 rounded-full mt-4 md:mt-0"
          />
        )}
      </div>

      {/* Información de Contacto y Campos Opcionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-6">
        {/* Contacto */}
        <div className="flex flex-col space-y-2">
          {data.personalInfo.email && (
            <span>Email: {data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>Téléphone: {data.personalInfo.phone}</span>
          )}
          {data.personalInfo.address && (
            <span>Adresse: {data.personalInfo.address}</span>
          )}
        </div>

        {/* Campos Opcionales */}
        <div className="flex flex-col space-y-2">
          {Object.entries(data.optionalFields || {}).map(([key, value]) => {
            const formatted = formatOptionalField(key, value);
            if (!formatted) return null;
            return (
              <span key={key}>{formatted}</span>
            );
          })}
        </div>
      </div>

      {/* Profil Professionnel */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
            Profil Professionnel
          </h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Expérience Professionnelle */}
      {data.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
            Expérience Professionnelle
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm italic text-gray-600">{exp.company}</p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Éducation */}
      {data.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
            Éducation
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-sm italic text-gray-600">{edu.institution}</p>
                {edu.description && (
                  <p className="text-gray-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compétences et Langues en columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compétences */}
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              Compétences
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Langues */}
        {data.languages?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              Langues
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {data.languages.map((lang, index) => (
                <li key={index}>{lang.language} - {lang.level}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
