import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  HomeTabs: undefined;
  NavList: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

function HamC() {
  const contents = ['Content 1', 'Content 2', 'Content 3', 'Content 4', 'Content 5', 'Content 6'];
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
          <Text style={styles.homeIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NavList')}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity> */}
      </View>

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
            <Text style={styles.contentButtonText}>{item}</Text>
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
  homeIcon: {
    fontSize: 24,
  },
  menuIcon: {
    fontSize: 24,
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
  contentButtonText: {
    fontSize: 14,
    color: '#000',
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
export default HamC;