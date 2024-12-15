import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const learningRoadmapData = [
  {
    title: "1. Tìm hiểu về ngành IT",
    items: [
      {
        name: "Kiến Thức Nhập Môn IT",
        type: "Miễn phí",
        description: "Khóa học giúp bạn làm quen với ngành IT, các khái niệm cơ bản và môi trường làm việc.",
      },
    ],
    color: '#FF8A80', // Giữ nguyên màu đỏ nhạt
  },
  {
    title: "2. HTML và CSS",
    items: [
      {
        name: "HTML CSS Pro",
        type: "1.299.000đ",
        description: "Khóa học chuyên sâu về HTML và CSS, bao gồm responsive, flexbox và grid layout.",
      },
      {
        name: "Responsive Với Grid System",
        type: "Miễn phí",
        description: "Học cách xây dựng giao diện web responsive với Grid System và Bootstrap.",
      },
    ],
    color: '#7E57C2', // Màu xanh dương lai tím
  },
  {
    title: "3. JavaScript",
    items: [
      {
        name: "Lập Trình JavaScript Cơ Bản",
        type: "Miễn phí",
        description: "Nắm vững kiến thức cơ bản và cách sử dụng JavaScript trong các dự án thực tế.",
      },
      {
        name: "Lập Trình JavaScript Nâng Cao",
        type: "Miễn phí",
        description: "Tìm hiểu chuyên sâu về ES6+, asynchronous programming, và OOP.",
      },
    ],
    color: '#FFA726', // Màu cam lai vàng
  },
  {
    title: "4. Sử dụng Ubuntu/Linux",
    items: [
      {
        name: "Làm việc với Terminal & Ubuntu",
        type: "Miễn phí",
        description: "Học cách sử dụng Linux và các lệnh Terminal cơ bản cho lập trình viên.",
      },
    ],
    color: '#37474F', // Màu xanh đậm lai đen
  },
];

function LearningRoadmap() {
  return (
    <ScrollView style={styles.container}>
      {learningRoadmapData.map((route, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{route.title}</Text>
          <FlatList
            data={route.items}
            keyExtractor={(item, idx) => `${index}-${idx}`}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={[styles.courseCard, { backgroundColor: route.color }]}>
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
                <Text style={styles.courseType}>{item.type}</Text>
                <TouchableOpacity style={styles.courseButton}>
                  <Text style={styles.buttonText}>Xem khóa học</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  courseCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  courseDescription: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 5,
  },
  courseType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  courseButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LearningRoadmap;
