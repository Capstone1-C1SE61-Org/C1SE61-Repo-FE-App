import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useAuth } from '../../API/AuthContextAPI'; // Đảm bảo đường dẫn đúng
export interface AuthProps {
  token: string | null; // Token của người dùng
  onLogout: () => Promise<void>; // Hàm đăng xuất
  // Thêm các thuộc tính khác nếu cần
}
const NavList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const authContext = useAuth(); // Lấy toàn bộ context
  const { onLogout } = authContext || {}; // Kiểm tra và giải cấu trúc an toàn
  const [token, setToken] = useState<string | null>(null);

  const handleLogout = async () => {
    if (!onLogout) {
      console.error('Logout function is not available in AuthContext.');
      Alert.alert('Lỗi', 'Không thể thực hiện đăng xuất.');
      return;
    }

    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              await onLogout();
              console.log('Logged out successfully');
              console.log('Token đã bị xóa:', token);
              setToken(null);
              // Reset điều hướng để xóa lịch sử và đưa về màn hình Login
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Thay 'Login' bằng tên màn hình đăng nhập
              });
            } catch (error) {
              Alert.alert('Lỗi', 'Đăng xuất thất bại. Vui lòng thử lại.');
              console.error('Logout error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Nút đóng */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('home')}>
        <FontAwesome name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Menu */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="history"
          label="History"
          onPress={() => navigation.navigate('History')}
        />
        <MenuItem
          icon="file-text"
          label="Terms & Policies"
          onPress={() => navigation.navigate('TermsAndPolicies')}
        />
        <MenuItem
          icon="cog"
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem
          icon="info-circle"
          label="Help"
          onPress={() => navigation.navigate('Help')}
        />
        <MenuItem
          icon="comments"
          label="Blog"
          onPress={() => navigation.navigate('Blog')}
        />
        <MenuItem
          icon="arrow-left"
          label="Exit"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

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
