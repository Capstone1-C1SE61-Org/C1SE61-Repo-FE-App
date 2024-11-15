import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Navlist() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Remove the token and other user data
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userInfo');
      
      // Redirect to login screen or any other initial screen
      navigation.navigate('Login');  // Replace 'Login' with the appropriate route name
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Navigation to Account screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
        <Text style={styles.text}>Account</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Navlist;
