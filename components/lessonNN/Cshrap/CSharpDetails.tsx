import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  HomeTabs: undefined;
  NavList: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

function CSharpDetails() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:8080/api/v1/course')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          id: item.courseId,
          title: item.courseName,
          description: item.image, // Assuming 'image' contains some description or modify as needed
        }));
        setContents(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFC107" />
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}></View>

          {/* Subheader */}
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>Courses</Text>
            <Text style={styles.subHeaderText}>Available Programming Languages</Text>
          </View>

          {/* Contents */}
          <ScrollView style={styles.contents}>
            <Text style={styles.sectionTitle}>Contents</Text>
            {contents.map((item, index) => (
              <TouchableOpacity key={index} style={styles.contentButton}>
                <Text style={styles.contentButtonTitle}>{item.title}</Text>
                <Text style={styles.contentButtonDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Learn Button */}
          <TouchableOpacity
            style={styles.learnButton}
            onPress={() => navigation.navigate('NavList')} // Change 'NavList' as per your navigation setup
          >
            <Text style={styles.learnButtonText}>Learn</Text>
          </TouchableOpacity>
        </>
      )}
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
