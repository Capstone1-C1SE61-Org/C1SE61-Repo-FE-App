import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { API_URL, useAuth } from '../../../API/AuthContextAPI';

interface Lesson {
  lessonId: number;
  lessonName: string;
  lessonContent: string;
  video: string;
  lessonDuration: string;
}

function JsDetails() {
  const route = useRoute();
  const { courseId } = route.params as { courseId: number };
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { authState } = useAuth();
  const token = authState?.token;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`${API_URL}/lessons/course/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'An error occurred');
          return;
        }

        const data = await response.json();

        // Kiểm tra dữ liệu trả về và gán giá trị mặc định nếu không phải là mảng
        if (Array.isArray(data)) {
          setLessons(data);
        } else {
          setLessons([]); // Nếu không phải mảng, gán giá trị mặc định
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setErrorMessage('Failed to fetch lessons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFC107" />
      ) : errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : lessons && lessons.length > 0 ? (
        <ScrollView style={styles.lessonList}>
          {lessons.map((lesson, index) => (
            <View key={lesson.lessonId} style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>{index + 1}. {lesson.lessonName}</Text>
              <Text style={styles.lessonContent}>{lesson.lessonContent}</Text>
              <TouchableOpacity
                style={styles.learnButton}
                onPress={() => navigation.navigate('DGioithieuHTMLCSS', { lessonId: lesson.lessonId })} // Truyền lessonId
              >
                <Text style={styles.learnButtonText}>Learn</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.errorMessage}>No lessons available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  lessonList: {
    marginBottom: 60, // Dành không gian cho nút Learn
  },
  lessonCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lessonContent: {
    fontSize: 14,
    color: '#555',
  },
  learnButton: {
    marginTop: 10,
    backgroundColor: '#FFC107',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  learnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JsDetails;
