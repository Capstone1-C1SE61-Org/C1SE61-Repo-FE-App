import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Button,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

function Setting() {
  const [selectedMenu, setSelectedMenu] = useState("Thông tin cá nhân");
  const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);

  // State để lưu dữ liệu nhập cho đổi mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State để lưu dữ liệu cá nhân
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const menuItems = [
    { id: "1", label: "Thông tin cá nhân", icon: "user", IconComponent: FontAwesome },
    { id: "2", label: "Mật khẩu và bảo mật", icon: "lock", IconComponent: AntDesign },
  ];

  const renderMenuContent = () => {
    switch (selectedMenu) {
      case "Thông tin cá nhân":
        return (
          <View style={styles.content}>
            <Text style={styles.sectionHeader}>Thông tin cá nhân</Text>
            <Text style={styles.sectionDescription}>
              Quản lý thông tin cá nhân của bạn.
            </Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Họ và tên</Text>
                <TextInput
                  style={styles.textInput}
                  value={fullname}
                  onChangeText={setFullname}
                  placeholder="Nhập họ và tên"
                />
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Tên người dùng</Text>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Nhập tên người dùng"
                />
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Giới thiệu</Text>
                <TextInput
                  style={styles.textInput}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Nhập giới thiệu"
                />
              </View>
            </View>
          </View>
        );

      case "Mật khẩu và bảo mật":
        return (
          <View style={styles.content}>
            <Text style={styles.sectionHeader}>Mật khẩu và bảo mật</Text>
            <Text style={styles.sectionDescription}>
              Quản lý mật khẩu và bảo mật tài khoản của bạn.
            </Text>
            <TouchableOpacity
              style={styles.securityItem}
              onPress={() => setChangePasswordVisible(true)}
            >
              <Text style={styles.securityText}>Đổi mật khẩu</Text>
              <AntDesign name="right" size={16} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.securityItem}>
              <Text style={styles.securityText}>Xác minh 2 bước</Text>
              <AntDesign name="right" size={16} color="#555" />
            </TouchableOpacity>

            {/* Change Password Modal */}
            <Modal
  transparent={true}
  animationType="slide"
  visible={isChangePasswordVisible}
  onRequestClose={() => setChangePasswordVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setChangePasswordVisible(false)}
      >
        <AntDesign name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Nhập mật khẩu hiện tại"
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.modalInput}
        placeholder="Nhập mật khẩu mới"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.modalInput}
        placeholder="Nhập lại mật khẩu mới"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          // Handle password change logic here
          setChangePasswordVisible(false);
        }}
      >
        <Text style={styles.submitButtonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              selectedMenu === item.label && styles.menuItemActive,
            ]}
            onPress={() => setSelectedMenu(item.label)}
          >
            <item.IconComponent
              Name={item.icon || "question"}
              size={20}
              style={[
                styles.menuIcon,
                selectedMenu === item.label && styles.menuIconActive,
              ]}
            />
            <Text
              style={[
                styles.menuText,
                selectedMenu === item.label && styles.menuTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>{renderMenuContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
  },
  menuContainer: {
    width: "35%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ececec",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  menuItemActive: {
    backgroundColor: "#e8f0fe",
  },
  menuText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  menuTextActive: {
    fontWeight: "bold",
    color: "#007aff",
  },
  menuIcon: {
    color: "#555",
  },
  menuIconActive: {
    color: "#007aff",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 10,
  },  
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  securityText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Setting;