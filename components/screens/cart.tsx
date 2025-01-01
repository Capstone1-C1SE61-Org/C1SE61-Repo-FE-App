import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Linking } from "react-native";
import { API_URL, useAuth } from "../../API/AuthContextAPI";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

interface Instructor {
  instructorName: string;
  instructorEmail: string;
  instructorImg: string;
}

interface Course {
  courseId: number;
  courseName: string;
  coursePrice: number;
  image: string;
  instructor: Instructor;
}

interface CartDetail {
  cartDetailId: number;
  course: Course;
  status: boolean;
}

interface CartData {
  cart: {
    cartId: number;
    receiverName: string;
    receiverEmail: string;
    receiverPhone: string;
  };
  cartDetailList: CartDetail[];
}

const Cart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { authState } = useAuth();
  const token = authState?.token;
  const navigator = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "An error occurred");
          return;
        }
        const data = await response.json();
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setErrorMessage("Failed to fetch cart. Please try again later.");
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { url } = event;
  
      // Parse the query parameters from the returned URL
      const params = new URLSearchParams(url.split("?")[1]);
      const responseCode = params.get("vnp_ResponseCode");
      const transactionStatus = params.get("vnp_TransactionStatus");
      const transactionId = params.get("vnp_TransactionNo");
      const message = params.get("vnp_OrderInfo");
  
      if (responseCode === "00" && transactionStatus === "00") {
        Alert.alert("Success", `Payment successful! Transaction ID: ${transactionId}`);
        setCartData(null); // Clear cart data after successful payment
      } else {
        Alert.alert("Error", `Payment failed! Reason: ${message || "Unknown error"}`);
      }
    };
  
    const subscription = Linking.addEventListener("url", handleDeepLink);
  
    // Cleanup subscription
    return () => {
      subscription.remove();
    };
  }, []);
  
  

  const handleRemoveFromCart = async (cartDetailId: number) => {
    if (!cartData) return;

    const updatedCart = {
      cart: cartData.cart,
      cartDetailList: cartData.cartDetailList.map((detail) =>
        detail.cartDetailId === cartDetailId ? { ...detail, status: true } : detail
      ),
    };

    try {
      const response = await fetch(`${API_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating cart:", errorData.message || "An error occurred");
        Alert.alert("Error", "Failed to remove the course from the cart.");
        return;
      }

      setCartData((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          cartDetailList: prevState.cartDetailList.filter(
            (detail) => detail.cartDetailId !== cartDetailId
          ),
        };
      });

      Alert.alert("Success", "Course removed from the cart successfully.");
    } catch (error) {
      console.error("Error updating cart:", error);
      Alert.alert("Error", "Failed to update the cart. Please try again later.");
    }
  };

  // const handlePayment = async () => {
  //   try {
  //     const requestBody = {
  //       cart: cartData?.cart,
  //       cartDetailList: cartData?.cartDetailList,
  //     };
  
  //     const response = await fetch(`${API_URL}/payment`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Error during payment:", errorData.message || "An error occurred");
  //       Alert.alert("Error", "Payment failed. Please try again.");
  //       return;
  //     }
  
  //     const paymentData = await response.json();
  //     if (paymentData.url && paymentData.status === 'OK') {
  //       Linking.openURL(paymentData.url).catch((err) =>
  //         console.error("Failed to open URL:", err)
  //       );
  //       console.log("Payment successful:", paymentData);
  //     } else {
  //       Alert.alert("Error", "Payment URL not found.");
  //     }
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //     Alert.alert("Error", "Payment failed. Please try again later.");
  //   }
  // };
  
  const handlePayment = async () => {
    try {
      const requestBody = {
        cart: cartData?.cart,
        cartDetailList: cartData?.cartDetailList,
      };
  
      const response = await fetch(`${API_URL}/payment`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error during payment:", errorData.message || "An error occurred");
        Alert.alert("Error", "Payment failed. Please try again.");
        return;
      }
  
      const paymentData = await response.json();
      if (paymentData.url && paymentData.status === "OK") {
        // Navigate to PaymentStatusScreen with transaction reference
        navigator.navigate("PaymentStatus", {
          vnp_TxnRef: paymentData.url.split("vnp_TxnRef=")[1].split("&")[0], // Extract TxnRef
        });
        console.log("Payment successful:", paymentData.url);
        Linking.openURL(paymentData.url).catch((err) =>
          console.error("Failed to open payment URL:", err)
        );
      } else {
        Alert.alert("Error", "Payment URL not found.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      Alert.alert("Error", "Payment failed. Please try again later.");
    }
  };
  

  const renderCartItem = ({ item }: { item: CartDetail }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.course.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.course.courseName}</Text>
        <Text style={styles.coursePrice}>
          {item.course.coursePrice === 0 ? "Free" : `${item.course.coursePrice.toLocaleString()} VND`}
        </Text>
        <Text style={styles.instructorName}>
          Instructor: {item.course.instructor.instructorName}
        </Text>
        <Text style={styles.instructorEmail}>
          Email: {item.course.instructor.instructorEmail}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFromCart(item.cartDetailId)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : cartData ? (
        <>
          <View style={styles.receiverInfo}>
            <Text style={styles.receiverText}>
              Name: {cartData.cart.receiverName}
            </Text>
            <Text style={styles.receiverText}>
              Email: {cartData.cart.receiverEmail}
            </Text>
            <Text style={styles.receiverText}>
              Phone: {cartData.cart.receiverPhone}
            </Text>
          </View>
          <FlatList
            data={cartData.cartDetailList}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.cartDetailId.toString()}
            contentContainerStyle={styles.cartList}
          />
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.paymentButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading cart...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  receiverInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  receiverText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 14,
    color: "#555",
  },
  instructorName: {
    fontSize: 14,
    color: "#555",
  },
  instructorEmail: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  paymentButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default Cart;
