import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // Sử dụng useNavigation để lấy navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Hàm xử lý đăng ký
  const handleSignUp = async () => {
    if (!username || !password || !email || !fullName) {
      Alert.alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Thực hiện yêu cầu API đăng ký
      const response = await axios.post('https://your-api-endpoint/signup', {
        username: username,
        password: password,
        email: email,
        fullName: fullName,
      });

      // Kiểm tra nếu đăng ký thành công và có token
      if (response.data && response.data.token) {
        // Lưu các thông tin vào AsyncStorage
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userType', response.data.type);
        await AsyncStorage.setItem('userId', response.data.id.toString());
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('roles', JSON.stringify(response.data.roles));

        // Chuyển hướng đến màn hình đăng nhập sau khi đăng ký thành công
        Alert.alert('Đăng ký thành công!', 'Chúc mừng bạn đã đăng ký thành công.');
        navigation.navigate('Login'); // Chuyển hướng đến màn hình đăng nhập
      } else {
        Alert.alert('Đăng ký thất bại', 'Vui lòng thử lại sau');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Đã có lỗi xảy ra', 'Vui lòng thử lại sau');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Đăng Ký</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Tên tài khoản"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          <AntDesign name="mail" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Feather name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Họ và tên"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Feather name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Mật khẩu"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.haveAccountText}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#6a4ee4',
    marginHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  haveAccountText: {
    color: '#6a4ee4',
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
