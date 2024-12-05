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
          source={{ uri: 'data:image/jpeg;base64,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 ' }} // Hình banner
          style={styles.banner}
        />
        <Image
          source={{ uri: 'data:image/jpeg;base64,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' }} // Avatar
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
