import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

type RootStackParamList = {
  HomeTabs: undefined;
  NavList: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

function CSharpDetails() {
  const contents = [
    { title: 'Introduction to Java', description: 'Learn the basics of Java programming.' },
    { title: 'Java Variables', description: 'Understand variables and data types in Java.' },
    { title: 'Control Structures', description: 'Learn about if-else and loops.' },
    { title: 'Object-Oriented Programming', description: 'Dive into classes and objects.' },
    { title: 'Java Collections', description: 'Work with arrays, lists, and maps.' },
    { title: 'Advanced Topics', description: 'Explore multithreading and streams.' },
  ];
  
  const navigation = useNavigation<NavigationProps>();


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      {/* Subheader */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>JAVA</Text>
        <Text style={styles.subHeaderText}>A Programming Language</Text>
      </View>

      {/* Description */}
      <ScrollView style={styles.description}>
        <Text style={styles.descriptionText}>Bạn sẽ học được gì?</Text>
      </ScrollView>

      {/* Contents */}
      <View style={styles.contents}>
        <Text style={styles.sectionTitle}>Contents</Text>
        {contents.map((item, index) => (
          <TouchableOpacity key={index} style={styles.contentButton}>
            <Text style={styles.contentButtonTitle}>{item.title}</Text>
            <Text style={styles.contentButtonDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Learn Button */}
      <TouchableOpacity style={styles.learnButton} onPress={() => navigation.navigate('learnCs')}>
        <Text style={styles.learnButtonText}>Learn</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subHeader: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 16,
  },
  description: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
  contents: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contentButtonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  contentButtonDescription: {
    fontSize: 12,
    color: '#555',
  },
  learnButton: {
    backgroundColor: '#FFC107',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  learnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CSharpDetails;