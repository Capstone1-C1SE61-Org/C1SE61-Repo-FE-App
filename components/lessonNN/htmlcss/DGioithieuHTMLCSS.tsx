import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Video from "react-native-video";
import axios from "axios";
import { API_URL, useAuth } from "../../../API/AuthContextAPI";
import { useRoute } from "@react-navigation/native";

interface Lesson {
  lessonName: string;
  lessonContent: string;
  video: string;
  lessonDuration: string;
}

const DGioithieuHTML = () => {
  const route = useRoute();
  const { lessonId } = route.params as { lessonId: number }; // Lấy lessonId từ route
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const { authState } = useAuth();
  const token = authState?.token;
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLesson = async () => {
      setLoading(true); // Bắt đầu tải
      const response = await axios.get(`${API_URL}/lessons/${lessonId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { lessonName, lessonContent, video, lessonDuration } = response.data;
      setLesson({ lessonName, lessonContent, video, lessonDuration }); // Chỉ lấy dữ liệu cần thiết
      console.log("Filtered Lesson Data:", {lessonId, lessonName, lessonContent, video, lessonDuration });
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFC107" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson?.lessonName}</Text>
      <Text style={styles.content}>{lesson?.lessonContent}</Text>
      {lesson?.video ? (
        <Video
            source={{ uri: lesson?.video }}
            style={styles.video}
            controls={true}
            resizeMode="contain"
        />
        ) : (
        <Text style={styles.errorText}>Video hiện không khả dụng</Text>
        )}

      <Text style={styles.duration}>
        Thời lượng: {lesson?.lessonDuration} phút
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    marginBottom: 20,
  },
  duration: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default DGioithieuHTML;