import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { API_URL } from '../API/AuthContextAPI';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // Added username field
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Added phone field
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Thường');
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  // const handleSignUp = async () => {
  //   if (!name || !username || !email || !phone || !password || !confirmPassword) {
  //     Alert.alert('Please fill out all fields');
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     Alert.alert('Passwords do not match');
  //     return;
  //   }

  //   setLoading(true); // Start loading state

  //   try {
  //     const response = await fetch('http://192.168.0.102:8080/api/v1/public/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name,
  //         username,
  //         email,
  //         phone,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();
  //     setLoading(false); // Stop loading state

  //     if (response.ok) {
  //       Alert.alert('Sign Up Successful!', 'Your account has been created.');
  //       // Navigate or take additional actions after successful signup
  //     } else {
  //       Alert.alert('Sign Up Failed', data.message || 'An error occurred. Please try again.');
  //     }
  //   } catch (error) {
  //     setLoading(false); // Stop loading state
  //     Alert.alert('Error', 'Unable to sign up. Please try again later.');
  //   }
  // };
 
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleSignUp = async () => {
    if (!name || !username || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    setLoading(true); // Start loading state
  
    try {
      const response = await fetch(`${API_URL}/public/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          phone,
          password,
          userType,
        }),
      });
  
      const data = await response.json(); // Parse the JSON response
      setLoading(false); // Stop loading state
  
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        // Reset form or navigate to the login screen
        setName('');
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setUserType('Thường');
        // Navigate or take additional actions after successful signup
        navigation.navigate('Login');
      } else {
        // Show the server error message if available
        Alert.alert('Error', data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setLoading(false); // Stop loading state
      console.error('Sign-Up Error:', error);
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Account name"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Feather name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Feather name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signUpButtonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("Login")}>Đã có tài khoản?</Text>
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
  // Giữ nguyên phần styles như trước
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginVertical: 10,
    marginTop: 40,
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
    justifyContent: 'space-between',
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
  forgotPasswordText: {
    color: '#6a4ee4',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
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

export default SignUpScreen;
