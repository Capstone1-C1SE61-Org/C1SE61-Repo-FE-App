// utils/common.js

// Hàm kiểm tra xem một đối tượng có phải là email hợp lệ không
export const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };
  
  // Hàm hiển thị thông báo lỗi
  export const showError = (message) => {
    alert(`Lỗi: ${message}`);
  };
  
  // Hàm kiểm tra xem chuỗi có phải là một số không
  export const isNumeric = (str) => {
    return !isNaN(str);
  };
  
  // Hàm lấy thông tin từ Local Storage (hoặc AsyncStorage trong React Native)
  export const getStorageItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Hàm lưu thông tin vào Local Storage (hoặc AsyncStorage trong React Native)
  export const setStorageItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };
  