import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function Help() {
    const [inputText, setInputText] = useState('');

    const handleHelpRequest = () => {
        if (inputText.trim() !== '') {
            alert(`Yêu cầu hỗ trợ: ${inputText}`);
            setInputText(''); // Reset ô nhập liệu sau khi gửi
        } else {
            alert('Vui lòng nhập nội dung cần hỗ trợ.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tao có thể giúp gì cho mày ?</Text>
            
            {/* Ô nhập liệu */}
            <TextInput
                style={styles.input}
                placeholder="Nhập mẹ câu hỏi mày vào mẹ đi"
                value={inputText}
                onChangeText={setInputText}
                multiline
            />

            {/* Nút gửi */}
            <TouchableOpacity style={styles.button} onPress={handleHelpRequest}>
                <FontAwesome name="send" size={20} color="#fff" />
                <Text style={styles.buttonText}>Gửi yêu cầu</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Help;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 120,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    buttonText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
