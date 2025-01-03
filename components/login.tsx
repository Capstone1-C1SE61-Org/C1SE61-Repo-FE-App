import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, useAuth } from '../API/AuthContextAPI';

const LoginScreen = () => {
  const [username, setUsername] = useState('trankhanhlinh');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false); // Thêm trạng thái này
  const { onLogin } = useAuth();

  useEffect(() => {
    const testCall = async () => {
        const result = await axios.post(`${API_URL}/public/login`);
        console.log("File: login.tsx:19 ~ testCall ~ result:", result);
    };
    testCall();
  }, []);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập tài khoản và mật khẩu");
      return;
    }
  
    try {
      const result = await onLogin!(username, password);
  
      if (result && result.error) {
        Alert.alert("Đăng nhập thất bại", result.msg || "Thông tin đăng nhập không chính xác");
        return;
      }
  
      const { roles, token } = result;
  
      if (!roles || !Array.isArray(roles) || !token) {
        Alert.alert("Lỗi", "Dữ liệu vai trò hoặc token không hợp lệ");
        return;
      }
  
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('roles', JSON.stringify(roles));
  
      if (roles.includes('ROLE_CUSTOMER')) {
        // Reset điều hướng để xóa lịch sử của màn hình đăng nhập
        navigation.reset({
          index: 0,
          routes: [{ name: 'home' }], // Thay 'home' bằng tên màn hình chính của bạn
        });
      } else {
        Alert.alert("Lỗi", "Vai trò không hợp lệ");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Đăng nhập thất bại", "Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LogIn</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Account"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Feather name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword} // Sử dụng trạng thái để ẩn/hiển mật khẩu
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("Forgotpassword")}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("SignUp")}>Chưa có tài khoản?</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Or connect using</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Entypo name="facebook" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="twitter" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginVertical: 50,
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
  signInButton: {
    backgroundColor: '#6a4ee4',
    marginHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#6a4ee4',
    textAlign: 'center',
    marginVertical: 10,
  },
  orText: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  socialButton: {
    backgroundColor: '#6a4ee4',
    padding: 10,
    borderRadius: 50,
  },
});

export default LoginScreen;