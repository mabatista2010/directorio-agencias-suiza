import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Definición de estilos mejorados
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: 'white',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameTitleContainer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: '#555',
  },
  contactInfo: {
    fontSize: 9,
    color: '#555',
    textAlign: 'right',
  },
  optionalFields: {
    fontSize: 9,
    color: '#555',
    marginTop: 4,
    textAlign: 'right',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333',
  },
  experienceItem: {
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  experienceDetails: {
    fontSize: 9,
    color: '#666',
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  educationDetails: {
    fontSize: 9,
    color: '#666',
    marginBottom: 3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 9,
    backgroundColor: '#e0e0e0',
    padding: '2 6',
    borderRadius: 3,
    marginBottom: 4,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  language: {
    fontSize: 9,
    marginBottom: 4,
  },
});

const formatOptionalField = (key, value) => {
  if (!value) return null;

  // Si es freeText, devolver objeto con valor sin etiqueta
  if (key === 'freeText') {
    return {
      label: '',
      value: value
    };
  }

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

  const formattedValue = Array.isArray(value) ? value.join(', ') : value;

  return {
    label,
    value: formattedValue
  };
};

// Componente ClassicPDF mejorado
const ClassicPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header optimizado */}
      <View style={styles.header}>
        {data.photo && <Image src={data.photo} style={styles.photo} />}
        <View style={styles.nameTitleContainer}>
          <Text style={styles.name}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          {data.personalInfo.email && (
            <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
          )}
          {data.personalInfo.phone && (
            <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
          )}
          {data.personalInfo.address && (
            <Text style={styles.contactInfo}>{data.personalInfo.address}</Text>
          )}

          {/* Campos opcionales */}
          {Object.entries(data.optionalFields || {}).map(([key, value]) => {
            if (!value) return null;

            // Si es freeText, separar por líneas y mostrar cada una
            if (key === 'freeText') {
              // Dividir el texto por saltos de línea
              const lines = value.split('\n');
              return lines.map((line, index) => (
                <Text key={`${key}-${index}`} style={[styles.optionalFields, { textAlign: 'left' }]}>
                  {line.trim()}
                </Text>
              ));
            }

            const formatted = formatOptionalField(key, value);
            if (!formatted) return null;

            return (
              <Text key={key} style={styles.optionalFields}>
                {formatted.label}: {formatted.value}
              </Text>
            );
          })}
        </View>
      </View>

      {/* Profil professionnel */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <Text style={styles.content}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Expérience Professionnelle */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{exp.position}</Text>
              <Text style={styles.experienceDetails}>
                {exp.company} | {exp.startMonth} {exp.startYear} - {exp.current ? 'Présent' : `${exp.endMonth} ${exp.endYear}`}
              </Text>
              <Text style={styles.content}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Éducation */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formation et certificats</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationTitle}>{edu.degree}</Text>
              <Text style={styles.educationDetails}>
                {edu.institution} | {edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}
              </Text>
              {edu.description && <Text style={styles.content}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Compétences et Langues en columnas */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Compétences */}
        {data.skills?.length > 0 && (
          <View style={{ width: '48%' }}>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Langues */}
        {data.languages?.length > 0 && (
          <View style={{ width: '48%' }}>
            <Text style={styles.sectionTitle}>Langues</Text>
            <View style={styles.languagesContainer}>
              {data.languages.map((lang, index) => (
                <Text key={index} style={styles.language}>
                  {lang.language} - {lang.level}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default ClassicPDF;
