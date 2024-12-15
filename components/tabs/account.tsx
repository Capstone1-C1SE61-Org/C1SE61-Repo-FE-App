import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
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

  // Data for the whole content (combined sections into one list)
  const sections = [
    {
      type: 'profile', // Type of section: profile, course, activity
      id: 'profile',
      data: {
        username: 'Trung Truong',
        bio: 'hãy tạo bug cùng mèo tập chơi',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        bannerUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    },
    {
      type: 'courses',
      id: 'courses',
      title: 'Khóa học đã tham gia',
      data: userCourses,
    },
    {
      type: 'activities',
      id: 'activities',
      title: 'Hoạt động gần đây',
      data: recentActivities,
    },
  ];

  // Render Profile Section
  const renderProfile = (item: any) => (
    <View style={styles.profileContainer}>
      <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.bio}>{item.bio}</Text>
    </View>
  );

  // Render Courses Section
  const renderCourses = (courses: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{courses.title}</Text>
      {courses.data.map((course: any) => (
        <View key={course.id} style={styles.courseItem}>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.courseProgress}>Tiến độ: {course.progress}</Text>
        </View>
      ))}
    </View>
  );

  // Render Activities Section
  const renderActivities = (activities: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{activities.title}</Text>
      {activities.data.map((activity: any) => (
        <View key={activity.id} style={styles.activityItem}>
          <Ionicons name="time-outline" size={20} color="#555" />
          <Text style={styles.activityText}>{activity.activity}</Text>
        </View>
      ))}
    </View>
  );

  // Render each section based on the type
  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case 'profile':
        return renderProfile(item.data);
      case 'courses':
        return renderCourses(item);
      case 'activities':
        return renderActivities(item);
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
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
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    position: 'absolute',
    top: 120,
    left: 25,
    borderColor: '#ccc',
    borderWidth: 5,
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
