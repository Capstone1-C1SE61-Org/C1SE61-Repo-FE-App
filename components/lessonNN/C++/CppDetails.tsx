import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  HomeTabs: undefined;
  NavList: undefined;
};

type Lesson = {
  title: string;
  description: string;
};


type NavigationProps = NavigationProp<RootStackParamList>;

function CppDetails() {
  const [contents, setContents] = useState<Lesson[]>([]);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Fetch data from API
    fetch('https://your-api-endpoint.com/api/cpp-lessons')
      .then((response) => response.json())
      .then((data) => {
        const lessons = data.map((lesson: any) => ({
          title: lesson.lesson_name,
          description: lesson.lesson_content,
        }));
        setContents(lessons);
      })
      .catch((error) => console.error('Error fetching lessons:', error));
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      {/* Subheader */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>C++</Text>
        <Text style={styles.subHeaderText}>A Powerful Programming Language</Text>
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
      <TouchableOpacity style={styles.learnButton}>
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

export default CppDetails;
