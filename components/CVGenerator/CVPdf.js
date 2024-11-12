import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Registrar fuentes
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
  ]
});

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerInfo: {
    flex: 1,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 600,
  },
  experienceCompany: {
    fontSize: 11,
    color: '#666',
  },
  experienceDate: {
    fontSize: 10,
    color: '#888',
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 10,
    color: '#444',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    padding: '4 8',
    borderRadius: 3,
  },
});

const CVPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.address}</Text>
        </View>
        {data.photo && (
          <Image src={data.photo} style={styles.photo} />
        )}
      </View>

      {/* Summary */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profesional</Text>
          <Text style={styles.experienceDescription}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{exp.position}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDate}>
                {exp.startMonth} {exp.startYear} - {exp.current ? 'Presente' : `${exp.endMonth} ${exp.endYear}`}
              </Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educación</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{edu.degree}</Text>
              <Text style={styles.experienceCompany}>{edu.institution}</Text>
              <Text style={styles.experienceDate}>
                {edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}
              </Text>
              {edu.description && (
                <Text style={styles.experienceDescription}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idiomas</Text>
          {data.languages.map((lang, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>
                {lang.language} - {lang.level}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default CVPdf;