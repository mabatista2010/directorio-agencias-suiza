import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCar, FaBirthdayCake, FaFlag, FaHandshake } from 'react-icons/fa';

const formatOptionalField = (key, value) => {
  if (!value) return null;

  let label;
  switch(key) {
    case 'drivingLicense':
      label = 'Permis de conduire';
      return {
        label,
        value: Array.isArray(value) ? value.join(', ') : value
      };
    case 'birthDate':
      label = 'Date de naissance';
      const date = new Date(value);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
      return {
        label,
        value: formattedDate
      };
    case 'birthPlace':
      label = 'Lieu de naissance';
      return {
        label,
        value
      };
    case 'nationality':
      label = 'Nationalité';
      return {
        label,
        value
      };
    case 'maritalStatus':
      label = 'État civil';
      return {
        label,
        value
      };
    default:
      return {
        label: key,
        value: Array.isArray(value) ? value.join(', ') : value
      };
  }
};

const getIcon = (key) => {
  switch(key) {
    case 'email':
      return <FaEnvelope className="inline mr-2" />;
    case 'phone':
      return <FaPhone className="inline mr-2" />;
    case 'address':
      return <FaMapMarkerAlt className="inline mr-2" />;
    case 'drivingLicense':
      return <FaCar className="inline mr-2" />;
    case 'birthDate':
      return <FaBirthdayCake className="inline mr-2" />;
    case 'nationality':
      return <FaFlag className="inline mr-2" />;
    case 'maritalStatus':
      return <FaHandshake className="inline mr-2" />;
    default:
      return null;
  }
};

export default function ProfessionalTemplate({ data }) {
  return (
    <div className="bg-gray-50 flex shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-gray-800 to-gray-700 text-white p-8">
        {data.photo && (
          <div className="mb-6 flex justify-center">
            <img 
              src={data.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 shadow-lg"
            />
          </div>
        )}

        <div className="space-y-4">
          {/* Información de Contacto */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Contacto</h2>
            <ul className="space-y-2">
              {data.personalInfo.email && (
                <li className="flex items-center text-sm">
                  <FaEnvelope className="mr-2" />
                  <span>{data.personalInfo.email}</span>
                </li>
              )}
              {data.personalInfo.phone && (
                <li className="flex items-center text-sm">
                  <FaPhone className="mr-2" />
                  <span>{data.personalInfo.phone}</span>
                </li>
              )}
              {data.personalInfo.address && (
                <li className="flex items-center text-sm">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{data.personalInfo.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Campos Opcionales */}
          {Object.keys(data.optionalFields || {}).length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Información Personal</h2>
              <ul className="space-y-2 text-sm">
                {Object.entries(data.optionalFields).map(([key, value]) => {
                  const formatted = formatOptionalField(key, value);
                  if (!formatted) return null;

                  return (
                    <li key={key} className="flex items-center">
                      {getIcon(key) && <span>{getIcon(key)}</span>}
                      <span className="font-medium">{formatted.label}:</span>
                      <span className="ml-2">{formatted.value}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Habilidades */}
          {data.skills?.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-700 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {data.languages?.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Idiomas</h2>
              <ul className="space-y-2 text-sm">
                {data.languages.map((lang, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-gray-400">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificaciones */}
          {data.certifications?.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Certificaciones</h2>
              <ul className="space-y-2 text-sm">
                {data.certifications.map((cert, index) => (
                  <li key={index}>
                    <span className="font-medium">{cert.name}</span> - <span className="text-gray-400">{cert.issuer} ({cert.year})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="w-2/3 p-8 bg-white">
        {/* Nombre y Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-lg text-gray-700 mt-1">{data.personalInfo.title}</p>
        </div>

        {/* Resumen Profesional */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">
              Perfil Profesional
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experiencia Profesional */}
        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-1">
              Experiencia Profesional
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 text-lg">{exp.position}</h3>
                  <div className="text-gray-600 text-sm mb-1">
                    {exp.company} | {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                  </div>
                  {exp.location && (
                    <div className="text-gray-600 text-sm mb-1">{exp.location}</div>
                  )}
                  <p className="text-gray-700">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educación */}
        {data.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-1">
              Educación
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium text-gray-900 text-lg">{edu.degree}</h3>
                  <div className="text-gray-600 text-sm mb-1">
                    {edu.institution} | {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.location && (
                    <div className="text-gray-600 text-sm mb-1">{edu.location}</div>
                  )}
                  {edu.description && (
                    <p className="text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proyectos Destacados */}
        {data.projects?.length > 0 && (
          <div>
            <h2 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-1">
              Proyectos Destacados
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium text-gray-900 text-lg">{project.name}</h3>
                  <div className="text-gray-600 text-sm mb-1">{project.date}</div>
                  <p className="text-gray-700">{project.description}</p>
                  {project.technologies && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
