import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, useAuth } from '../../API/AuthContextAPI';

type CustomerData = {
  customerId: number;
  customerCode: string;
  customerName: string;
  customerPhone: string;
  customerGender: boolean;
  dateOfBirth: string;
  customerAddress: string;
  customerImg: string;
  customerTypeName: string;
  username: string;
  accountEmail: string;
};

function Account() {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const token = authState?.token;
  const roles = authState?.roles;

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
          Authorization: `Bearer ${authState?.token}`,
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Không thể tải thông tin tài khoản. Vui lòng thử lại.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <Image
        source={{ uri: `${API_URL}/customer/detail${userData.customerImg}` }} // sau thay đổi api cho avatar
        style={styles.avatar}
      />
      <Text style={styles.username}>{userData.customerName}</Text>
      <Text style={styles.info}>Mã khách hàng: {userData.customerCode}</Text>
      <Text style={styles.info}>Số điện thoại: {userData.customerPhone}</Text>
      <Text style={styles.info}>
        Giới tính: {userData.customerGender ? 'Nam' : 'Nữ'}
      </Text>
      <Text style={styles.info}>Ngày sinh: {userData.dateOfBirth}</Text>
      <Text style={styles.info}>Địa chỉ: {userData.customerAddress}</Text>
      <Text style={styles.info}>Loại khách hàng: {userData.customerTypeName}</Text>
      <Text style={styles.info}>Tài khoản: {userData.username}</Text>
      <Text style={styles.info}>Email: {userData.accountEmail}</Text>
      <Text style={styles.info}>Role: {authState?.roles}</Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
    borderColor: '#ccc',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default Account;
