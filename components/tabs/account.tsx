import React from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Account() {
  // Dữ liệu giả lập
  const userCourses = [
    { id: '1', name: 'React Native Basics', progress: '0%' },
    { id: '2', name: 'Advanced JavaScript', progress: '0%' },
  ];

  const recentActivities = [
    { id: '1', activity: 'Completed Quiz 1 in React Native Basics' },
    { id: '2', activity: 'Started Advanced JavaScript course' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Khung avatar và thông tin người dùng */}
      <View style={styles.profileContainer}>
        {/* Hình ảnh  */}
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Hình banner
          style={styles.banner}
        />
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Avatar
          style={styles.avatar}
        />
        <Text style={styles.username}>Trung Truong</Text>
        <Text style={styles.bio}>hãy tạo bug cùng mèo tập chơi</Text>
      </View>

      {/* Danh sách khóa học đã tham gia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khóa học đã tham gia</Text>
        <FlatList
          data={userCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <Text style={styles.courseName}>{item.name}</Text>
              <Text style={styles.courseProgress}>Tiến độ: {item.progress}</Text>
            </View>
          )}
          nestedScrollEnabled={true} // Fix lỗi VirtualizedLists
        />
      </View>

      {/* Hoạt động gần đây */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
        <FlatList
          data={recentActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <Ionicons name="time-outline" size={20} color="#555" />
              <Text style={styles.activityText}>{item.activity}</Text>
            </View>
          )}
          nestedScrollEnabled={true} // Fix lỗi VirtualizedLists
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  banner: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    // resizeMode: 'contain',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    position: "absolute",
    top: 120,
    left: 25,
},
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseItem: {
    marginBottom: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  courseProgress: {
    fontSize: 14,
    color: '#666',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default Account;