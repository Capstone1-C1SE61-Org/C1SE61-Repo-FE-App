import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

function History() {
    // Dữ liệu giả lập
    const userHistory = {
        username: 'Truong Tat Trung',
        completedLessons: [
            { id: '1', title: 'Giới thiệu HTML', date: '2024-11-20' },
            { id: '2', title: 'Biến và kiểu dữ liệu', date: '2024-11-25' },
            { id: '3', title: 'Mảng', date: '2024-11-28' },
            { id: '4', title: 'Giới thiệu CSS', date: '2024-12-20' },
        ],
    };

    return (
        <View style={styles.container}>
            {/* Hiển thị thông tin người dùng */}
            <View style={styles.userInfo}>
                <FontAwesome name="user-circle" size={50} color="#007bff" />
                <Text style={styles.username}>{userHistory.username}</Text>
            </View>

            {/* Danh sách bài học đã hoàn thành */}
            <Text style={styles.sectionTitle}>Bài học đã hoàn thành:</Text>
            <FlatList
                data={userHistory.completedLessons}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.lessonItem}>
                        <MaterialCommunityIcons name="check-circle" size={24} color="green" />
                        <View style={styles.lessonText}>
                            <Text style={styles.lessonTitle}>{item.title}</Text>
                            <Text style={styles.lessonDate}>Hoàn thành ngày: {item.date}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    lessonText: {
        marginLeft: 10,
    },
    lessonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    lessonDate: {
        fontSize: 14,
        color: '#777',
    },
});
