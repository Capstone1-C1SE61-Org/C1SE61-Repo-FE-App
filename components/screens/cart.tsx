import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import { API_URL, useAuth } from "../../API/AuthContextAPI";

type CartData = {
  cart: any;
  cartDetailList: Array<{
    cartDetailId: number;
    course: {
      image: string;
      courseName: string;
    };
  }>;
};

const Cart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const { authState } = useAuth();
  const token = authState?.token;

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCartData(data);
      } else {
        setErrorMessage(data.message || "Failed to load cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setErrorMessage("Failed to fetch cart. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/payment`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartData?.cart,
          cartDetailList: cartData?.cartDetailList,
        }),
      });
      const paymentData = await response.json();
      if (response.ok && paymentData.url) {
        setPaymentUrl(paymentData.url);
        setIsWebViewVisible(true);
      } else {
        Alert.alert("Error", "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      Alert.alert("Error", "Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleWebViewNavigationStateChange = async (navState: WebViewNavigation) => {
    const { url } = navState;

    if (url.includes("vnp_ResponseCode")) {
        setIsWebViewVisible(false); // Đóng WebView
        const params = new URLSearchParams(url.split("?")[1]);
        const responseCode = params.get("vnp_ResponseCode"); // Mã phản hồi giao dịch
        const message = params.get("vnp_OrderInfo"); // Thông tin đơn hàng
        const tnxRef = params.get("vnp_TxnRef"); // Mã giao dịch lấy từ URL

        if (responseCode === "00") {
            try {
                // Gọi API backend để xác nhận giao dịch
                const apiUrl = `${API_URL}/transaction/${tnxRef}`;
                const response = await fetch(apiUrl, { method: 'GET' }); // Phương thức GET

                if (response.ok) {
                    // Giao dịch thành công, thông báo cho người dùng
                    Alert.alert(
                        "Success",
                        "Payment completed successfully! A confirmation email has been sent to your address."
                    );
                    await fetchCart(); // Lấy lại dữ liệu giỏ hàng sau khi thanh toán thành công
                } else {
                    // Xử lý lỗi nếu API trả về trạng thái không thành công
                    Alert.alert(
                        "Error",
                        "Transaction confirmation failed! Please contact support."
                    );
                }
            } catch (error) {
                // Bắt lỗi nếu có vấn đề khi gọi API
                Alert.alert(
                    "Error",
                    "An error occurred while processing the transaction. Please try again later."
                );
                console.error("Transaction Error: ", error);
            }
        } else {
            // Xử lý nếu giao dịch thất bại
            try {
                // Gọi API để xóa giao dịch thất bại
                const failUrl = `${API_URL}/fail/${tnxRef}`;
                await fetch(failUrl, { method: 'GET' });

                // Thông báo lý do thất bại cho người dùng
                Alert.alert(
                    "Error",
                    `Payment failed! Reason: ${message}`
                );
            } catch (error) {
                Alert.alert(
                    "Error",
                    "An error occurred while handling the failed transaction."
                );
                console.error("Transaction Fail Error: ", error);
            }
        }
    }
};

  
  
  
  

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {cartData ? (
        <>
          <FlatList
            data={cartData.cartDetailList}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.course.image }} style={styles.courseImage} />
                <Text style={styles.courseTitle}>{item.course.courseName}</Text>
              </View>
            )}
            keyExtractor={(item) => item.cartDetailId.toString()}
          />
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.paymentButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading cart...</Text>
      )}

      <Modal visible={isWebViewVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          {paymentUrl && (
            <WebView
              source={{ uri: paymentUrl }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsWebViewVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  courseImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  courseTitle: {
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Cart;
