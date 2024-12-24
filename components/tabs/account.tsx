import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, useAuth } from '../../API/AuthContextAPI';
import { MaterialIcons } from '@expo/vector-icons'; // For edit icon

type CustomerData = {
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerImg: string;
  username: string;
  accountEmail: string;
};

type CourseData = {
  courseId: number;
  courseName: string;
  courseDescription: string;
};

function Account() {
  const [userData, setUserData] = useState<CustomerData | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const token = authState?.token;

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
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch(`${API_URL}/customer/courses`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authState?.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: CourseData[] = await response.json();
      if (response.ok) {
        setRegisteredCourses(data);
      } else {
        console.error('Error fetching courses:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleEdit = () => {
    console.log('Edit button pressed');
    // Future: Navigate to edit screen or trigger edit functionality
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchUserData(), fetchRegisteredCourses()]).finally(() => setLoading(false));
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
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: `${API_URL}/customer/detail ${userData.customerImg}` }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleEdit}>
            <MaterialIcons name="edit" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>{userData.customerName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Tên người dùng:</Text>
        <Text style={styles.infoValue}>{userData.customerName}</Text>

        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{userData.accountEmail}</Text>

        <Text style={styles.infoLabel}>SĐT:</Text>
        <Text style={styles.infoValue}>{userData.customerPhone}</Text>

        <Text style={styles.infoLabel}>Vai trò:</Text>
        <Text style={styles.infoValue}>{authState?.roles}</Text>
      </View>

      <View style={styles.coursesContainer}>
        <Text style={styles.sectionTitle}>Khóa học đã đăng ký</Text>
        {registeredCourses.length > 0 ? (
          registeredCourses.map(course => (
            <View key={course.courseId} style={styles.courseCard}>
              <Text style={styles.courseName}>{course.courseName}</Text>
              <Text style={styles.courseDescription}>{course.courseDescription}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noCoursesText}>Bạn chưa đăng ký khóa học nào.</Text>
        )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  coursesContainer: {
    marginTop: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  courseCard: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
  noCoursesText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default Account;