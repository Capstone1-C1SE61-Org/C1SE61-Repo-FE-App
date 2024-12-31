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
  customerName: string;
  customerPhone: string;
  customerImg: string;
  username: string;
  accountEmail: string;
};

function Account() {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const token = authState?.token;
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
      await AsyncStorage.getItem(`${token}`);
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
        console.log('User data fetched successfully:', data);
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
    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri: string = result.uri;
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
        <Text style={styles.info}><Text style={styles.label}>Họ và Tên:</Text> {userData.customerName}</Text>
        <Text style={styles.info}><Text style={styles.label}>Tài khoản:</Text> {userData.username}</Text>
        <Text style={styles.info}><Text style={styles.label}>Số điện thoại:</Text> {userData.customerPhone}</Text>
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
    backgroundColor: '#E8F1F2',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAE5E5',
  },
  errorText: {
    fontSize: 16,
    color: '#D9534F',
    fontWeight: 'bold',
  },
  profileContainer: {
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#ccc',
    backgroundColor: '#E8F1F2',
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 300,
    padding: 15,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    paddingBottom: 5,
    lineHeight: 22,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
  },
  iconButton: {
    marginRight: 15,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    
  },
});


export default Account;
