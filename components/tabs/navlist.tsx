import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useAuth } from '../../API/AuthContextAPI'; // Đảm bảo đường dẫn đúng

function NavList() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { onLogout } = useAuth(); // Lấy hàm onLogout từ AuthProvider

  const handleLogout = async () => {
    try {
      // Gọi hàm onLogout từ AuthProvider
      if (onLogout) {
        await onLogout();
        // Điều hướng về màn hình Login sau khi logout
        navigation.navigate('Login');
      } else {
        console.error('Logout function is not available');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Close Icon */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('home')}>
        <FontAwesome name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="history"
          label="History"
          onPress={() => navigation.navigate('History')}
        />
        <MenuItem
          icon="file-text-o"
          label="Terms & Policies"
          onPress={() => navigation.navigate('TermsAndPolicies')}
        />
        <MenuItem
          icon="cog"
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem
          icon="question"
          label="Help"
          onPress={() => navigation.navigate('Help')}
        />
        <MenuItem
          icon="check"
          label="Blog"
          onPress={() => navigation.navigate('Blog')}
        />
        <MenuItem
          icon="home"
          label="Exit"
          onPress={handleLogout} // Gọi hàm handleLogout khi người dùng chọn "Exit"
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
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 50,
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

export default NavList;
