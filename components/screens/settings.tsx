import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { API_URL, useAuth } from "../../API/AuthContextAPI";
import { Ionicons } from '@expo/vector-icons';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { authState } = useAuth();
  const token = authState?.token;
  const userData = authState?.userData;

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/public/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: userData, // Lấy username từ userData
          presentPassword: oldPassword,
          confirmPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Thành công", "Mật khẩu đã được thay đổi thành công!", [
          {
            text: "OK",
            onPress: () => {
              setOldPassword("");
              setNewPassword("");
            },
          },
        ]);
      } else {
        Alert.alert("Lỗi", data.message || "Đã xảy ra lỗi khi thay đổi mật khẩu.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thay đổi mật khẩu</Text>
      <Text style={styles.username}>Tài khoản: {userData || "Không xác định"}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu cũ"
          secureTextEntry={!showOldPassword}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
          <Ionicons name={showOldPassword ? "eye" : "eye-off"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <Button title="Xác nhận" onPress={handleChangePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
  },
});

export default ChangePassword;
