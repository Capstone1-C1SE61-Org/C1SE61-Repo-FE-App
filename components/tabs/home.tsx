import {   View, Text, TextInput, TouchableOpacity, StyleSheet,  FlatList } from 'react-native';
import {   FontAwesome, Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {   createDrawerNavigator } from '@react-navigation/drawer';
import {   NavigationContainer, useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Language {
  name: string;
  description: string;
  color: string;
  address: string;
}

const languages = [
  { name: 'HTML', description: 'The language for building web pages', color: '#9A59FF', address: 'hamC' },
  { name: 'JAVA', description: 'A Programming Language', color: '#FFDD44', address: 'hamC' },
  { name: 'CSS', description: 'The language for styling web pages', color: '#33A2FF', address: 'hamC' },
  { name: 'C#', description: 'A Programming Language', color: '#9A59FF' , address: 'hamC' },
];

const HomeTabs = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const renderLanguage = ({ item }: { item: Language }) => (
    <View style={[styles.languageCard, { backgroundColor: item.color }]}>
      <Text style={styles.languageTitle}>{item.name}</Text>
      <Text style={styles.languageDescription}>{item.description}</Text>
      {/* Navigation button for each language */}
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => navigation.navigate(item.address)} // Navigate to corresponding language screen
      >
        <Text style={styles.languageButtonText}>Learn {item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('navlist')}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#999" />
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>9+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Language List */}
      <FlatList
        data={languages}
        renderItem={renderLanguage}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.languageList}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('LearningRoadmap')}>
          <MaterialCommunityIcons name="file-document-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  menuButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
  },
  languageList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  languageCard: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  languageTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  languageDescription: {
    fontSize: 14,
    color: '#fff',
  },
  languageButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  navButton: {
    alignItems: 'center',
  },
});

export default HomeTabs;
