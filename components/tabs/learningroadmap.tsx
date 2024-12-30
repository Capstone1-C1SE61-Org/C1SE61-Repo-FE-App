import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Message {
  author: string;
  verified: boolean;
  title: string;
  description: string;
  tag: string;
  time: string;
  readTime: string;
  imageUrl: string;
}

const LearningRoadmap = () => {
  const [articles] = useState<Message[]>([
    {
      author: 'Sơn Đặng',
      verified: true,
      title: 'Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án "AI Powered Learning"',
      description: 'Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống...',
      tag: 'ReactJS',
      time: '3 tháng trước',
      readTime: '6 phút đọc',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      author: 'Lý Cao Nguyên',
      verified: false,
      title: 'Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày',
      description: 'Xin chào mọi người! Mình là Lý Cao Nguyên, mình đã làm một dự án website front-end...',
      tag: 'Front-end',
      time: '6 tháng trước',
      readTime: '4 phút đọc',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      author: 'Trần Hàng',
      verified: false,
      title: 'Mình công khai một dự án web trên GitHub',
      description: 'Xin chào mọi người! Mình là Trần Hàng, mình công khai một dự án web trên GitHub...',
      tag: 'Front-end',
      time: '6 tháng trước',
      readTime: '4 phút đọc',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ]);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.author}>{item.author}</Text>
          {item.verified && <FontAwesome name="check-circle" size={16} color="#007BFF" />}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.meta}>
          <Text style={styles.tag}>{item.tag}</Text>
          <Text style={styles.metaText}>{item.time}</Text>
          <Text style={styles.metaText}>{item.readTime}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bài viết nổi bật</Text>
      <Text style={styles.subheading}>
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
      </Text>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
  },
});

export default LearningRoadmap;
