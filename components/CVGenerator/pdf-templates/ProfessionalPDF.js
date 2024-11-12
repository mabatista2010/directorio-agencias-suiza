import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    fontFamily: 'Helvetica',
    padding: 20,
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#1f2937',
    padding: 20,
    color: 'white',
  },
  main: {
    width: '65%',
    padding: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitleDark: {
    fontSize: 12,
    color: '#d1d5db', // Color claro para fondo oscuro
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingBottom: 3,
  },
  sectionTitleLight: {
    fontSize: 12,
    color: '#1f2937', // Color oscuro para fondo claro
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 3,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 5,
  },
  nameDark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d1d5db', // Color claro para fondo oscuro
    marginBottom: 5,
  },
  nameLight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827', // Color oscuro para fondo claro
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 15,
  },
  // Estilos para el texto de Idiomas en ambos fondos
  languageTextDark: {
    fontSize: 11,
    color: '#d1d5db', // Color claro para fondo oscuro
    marginBottom: 2,
  },
  languageTextLight: {
    fontSize: 11,
    color: '#374151', // Color oscuro para fondo claro
    marginBottom: 2,
  },
  // Estilos para el contenido principal en ambos fondos
  contentDark: {
    fontSize: 11,
    color: '#d1d5db', // Color claro para fondo oscuro
    lineHeight: 1.4,
    marginBottom: 10,
  },
  contentLight: {
    fontSize: 11,
    color: '#374151', // Color oscuro para fondo claro
    lineHeight: 1.4,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#3b82f6',
    paddingLeft: 10,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  experienceDetails: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#10b981',
    paddingLeft: 10,
  },
  projectItem: {
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#8b5cf6',
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 10,
    color: '#374151',
    marginLeft: 10,
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    fontSize: 9,
    backgroundColor: '#4b5563',
    color: 'white',
    padding: '2 4',
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 4,
  },
});

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

const ProfessionalPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {data.photo && <Image src={data.photo} style={styles.photo} />}

        {/* Información de Contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleDark}>Contact</Text>
          {data.personalInfo.phone && (
            <View style={styles.contactInfo}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text>{data.personalInfo.phone}</Text>
            </View>
          )}
          {data.personalInfo.email && (
            <View style={styles.contactInfo}>
              <Text style={styles.contactIcon}>✉️</Text>
              <Text>{data.personalInfo.email}</Text>
            </View>
          )}
          {data.personalInfo.address && (
            <View style={styles.contactInfo}>
              <Text style={styles.contactIcon}>📍</Text>
              <Text>{data.personalInfo.address}</Text>
            </View>
          )}
        </View>

        {/* Campos Opcionales */}
        {data.optionalFields && Object.keys(data.optionalFields).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleDark}>Données personelles</Text>
            {Object.entries(data.optionalFields).map(([key, value]) => {
              const formatted = formatOptionalField(key, value);
              if (!formatted) return null;

              return (
                <View key={key} style={styles.contactInfo}>
                  <Text style={styles.contactIcon}>
                    {key === 'drivingLicense' && '🚗'}
                    {key === 'birthDate' && '🎂'}
                    {key === 'birthPlace' && '📍'}
                    {key === 'nationality' && '🌐'}
                    {key === 'maritalStatus' && '💍'}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>{formatted.label}:</Text>
                  <Text style={{ marginLeft: 5 }}>{formatted.value}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Habilidades */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleDark}>Compétences</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Idiomas */}
        {data.languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleDark}>Langues</Text>
            {data.languages.map((lang, index) => (
              <Text key={index} style={styles.languageTextDark}>
                {lang.language} - {lang.level}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Contenido Principal */}
      <View style={styles.main}>
        {/* Nombre y Título */}
        <View style={styles.section}>
          <Text style={styles.nameLight}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          {data.personalInfo.title && (
            <Text style={styles.title}>{data.personalInfo.title}</Text>
          )}
        </View>

        {/* Resumen Profesional */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleLight}>Profil</Text>
            <Text style={styles.contentLight}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experiencia Profesional */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleLight}>Expérience professionelle</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{exp.position}</Text>
                <Text style={styles.experienceDetails}>
                  {exp.company} | {exp.startMonth} {exp.startYear} - {exp.current ? 'Presente' : `${exp.endMonth} ${exp.endYear}`}
                </Text>
                <Text style={styles.contentLight}>{exp.description}</Text>
                {exp.achievements && exp.achievements.length > 0 && (
                  <View>
                    {exp.achievements.map((achievement, i) => (
                      <Text key={i} style={styles.listItem}>• {achievement}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Educación */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleLight}>Formation et cerfificats</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.experienceDetails}>
                  {edu.institution} | {edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}
                </Text>
                <Text style={styles.contentLight}>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Proyectos Destacados */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleLight}>Proyectos Destacados</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.experienceTitle}>{project.name}</Text>
                <Text style={styles.experienceDetails}>{project.date}</Text>
                <Text style={styles.contentLight}>{project.description}</Text>
                {project.technologies && project.technologies.length > 0 && (
                  <View style={styles.skillsContainer}>
                    {project.technologies.map((tech, i) => (
                      <Text key={i} style={styles.skill}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default ProfessionalPDF;
