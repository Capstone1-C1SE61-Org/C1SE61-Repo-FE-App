import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Đổi `Icon` thành `AntDesign`, `FontAwesome`, hoặc một trong các bộ icon bạn đã import
import { FontAwesome } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Menu() {
  // Sử dụng useNavigation để lấy navigation
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
      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <MenuItem
            icon="user-o"
            label="account"
            onPress={() => navigation.navigate('Account')}
          />
        <MenuItem
          icon="history"
          label="History"
          onPress={() => navigation.navigate('History')}
        />
        <MenuItem
          icon="file-text-o"
          label="Terms & Policies"
          onPress={() => navigation.navigate('Terms & Policies')}
        />
        <MenuItem
          icon="cog"
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem
          icon="question-circle"
          label="Help"
          onPress={() => navigation.navigate('Help')}
        />
        <MenuItem
          icon="newspaper-o"
          label="Blog"
          onPress={() => navigation.navigate('Blog')}
        />
        <MenuItem
          icon="sign-out"
          label="Exit"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <FontAwesome name={icon as any} size={20} color="#000" style={styles.icon} />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Menu;
