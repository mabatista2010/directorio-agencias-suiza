import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: 'white',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 100,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  content: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: '#2563eb',
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 10,
    color: '#2563eb',
    marginBottom: 5,
  },
  experienceDate: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: '#2563eb',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#e0e7ff',
    color: '#2563eb',
    padding: '4 8',
    borderRadius: 4,
  },
  languagesContainer: {
    marginTop: 5,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 10,
    color: '#64748b',
  },
});

const ModernPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header con diseño moderno */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>

          {/* Información de contacto */}
          <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.address}</Text>

          {/* Campos opcionales */}
          {Object.entries(data.optionalFields || {}).map(([key, value]) => {
            if (!value) return null;
            let label;
            switch(key) {
              case 'drivingLicense':
                label = 'Permis de conduire';
                return (
                  <Text key={key} style={styles.contactInfo}>
                    {label}: {Array.isArray(value) ? value.join(', ') : value}
                  </Text>
                );
                case 'freeText':
                label = '';
                return (
                  <Text key={key} style={styles.contactInfo}>
                    {label}: {Array.isArray(value) ? value.join(', ') : value}
                  </Text>
                );
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
                label = 'Êtat civil';
                break;
              default:
                label = key;
            }
            return (
              <Text key={key} style={styles.contactInfo}>
                {label}: {value}
              </Text>
            );
          })}
        </View>

        {data.photo && (
          <View style={styles.headerRight}>
            <Image src={data.photo} style={styles.photo} />
          </View>
        )}
      </View>

      {/* Perfil Profesional */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <Text style={styles.content}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experiencia */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expérience professionelle</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{exp.position}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDate}>
                {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
              </Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Educación */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formation et certificats</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.experienceTitle}>{edu.degree}</Text>
              <Text style={styles.experienceCompany}>{edu.institution}</Text>
              <Text style={styles.experienceDate}>
                {edu.startDate} - {edu.endDate}
              </Text>
              {edu.description && (
                <Text style={styles.experienceDescription}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Habilidades */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Idiomas */}
      {data.languages?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Langues</Text>
          <View style={styles.languagesContainer}>
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.language}</Text>
                <Text style={styles.languageLevel}>{lang.level}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ModernPDF;