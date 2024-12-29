import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, useAuth } from '../../API/AuthContextAPI';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type CustomerData = {
  customerId: number;
  customerCode: string;
  customerName: string;
  customerPhone: string;
  customerGender: boolean;
  dateOfBirth: string;
  customerAddress: string;
  customerImg: string;
  username: string;
  accountEmail: string;
};

function Account() {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const token = authState?.token;
  const roles = authState?.roles;
  const navigation = useNavigation();

  const updateUserData = (newData: CustomerData) => {
    setUserData(newData);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('EditAccount', { userData, updateUserData })}
        >
          <Ionicons name="pencil" size={24} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, userData]);

  const fetchUserData = async () => {
    try {
      await AsyncStorage.getItem(`${token} && ${roles}`);
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch(`${API_URL}/customer/detail`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: CustomerData = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.error('Error fetching account info:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const formData = new FormData();
      formData.append('avatar', {
        uri: uri,
        type: 'image/jpeg', // or the correct mime type for the image
        name: 'avatar.jpg',
      });

      try {
        const response = await fetch(`${API_URL}/customer/upload-avatar`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Avatar updated successfully');
          // Update user data with new avatar URL
          setUserData((prevData) => ({
            ...prevData!,
            customerImg: data.newAvatarUrl, // Assuming your API returns the new avatar URL
          }));
        } else {
          Alert.alert('Error', 'Failed to update avatar');
        }
      } catch (error) {
        console.error('Upload error:', error);
        Alert.alert('Error', 'Failed to upload avatar');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không thể tải thông tin tài khoản. Vui lòng thử lại.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <TouchableOpacity onPress={handleImageChange}>
        <Image
          source={{ uri: userData.customerImg }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.username}>{userData.customerName}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}><Text style={styles.label}>Mã khách hàng:</Text> {userData.customerCode}</Text>
        <Text style={styles.info}><Text style={styles.label}>Số điện thoại:</Text> {userData.customerPhone}</Text>
        <Text style={styles.info}><Text style={styles.label}>Giới tính:</Text> {userData.customerGender ? 'Nam' : 'Nữ'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Ngày sinh:</Text> {userData.dateOfBirth}</Text>
        <Text style={styles.info}><Text style={styles.label}>Địa chỉ:</Text> {userData.customerAddress}</Text>
        <Text style={styles.info}><Text style={styles.label}>Tài khoản:</Text> {userData.username}</Text>
        <Text style={styles.info}><Text style={styles.label}>Email:</Text> {userData.accountEmail}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4d4f',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    marginRight: 15,
  },
});

export default Account;
