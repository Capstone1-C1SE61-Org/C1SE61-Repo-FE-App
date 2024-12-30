import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EditAccount = ({ route, navigation }: any) => {
  const { userData, updateUserData } = route.params;

  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.accountEmail);
  const [customerName, setCustomerName] = useState(userData.customerName);
  const [phone, setPhone] = useState(userData.customerPhone);
  const [address, setAddress] = useState(userData.customerAddress || '');
  const [gender, setGender] = useState(userData.customerGender ? 'Male' : 'Female');  // Gender state

  const handleSave = () => {
    const updatedUserData = {
      ...userData,
      username,  // You can remove this line if you no longer need the username
      accountEmail: email,
      customerName,
      customerPhone: phone,
      customerAddress: address,
      customerGender: gender === 'Male', // Gender field
    };
    updateUserData(updatedUserData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={customerName}
        onChangeText={setCustomerName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Remove the username input field */}
      {/* <TextInput
        style={styles.input}
        placeholder="Tên tài khoản"
        value={username}
        onChangeText={setUsername}
      /> */}

      {/* Address input field */}
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />

      {/* Gender Selection as Touchable Buttons */}
      <Text style={styles.genderLabel}>Giới tính</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'Male' && styles.selectedGender]}
          onPress={() => setGender('Male')}
        >
          <Text style={styles.genderButtonText}>Nam</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, gender === 'Female' && styles.selectedGender]}
          onPress={() => setGender('Female')}
        >
          <Text style={styles.genderButtonText}>Nữ</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditAccount;
