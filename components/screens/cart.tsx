import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { API_URL } from "../../API/AuthContextAPI";

interface CartDetail {
  cartDetailId: number;
  course: {
    courseId: number;
    courseName: string;
    coursePrice: number;
    image: string;
  };
  status: boolean;
}

interface CartData {
  cart: {
    cartId: number;
  };
  cartDetailList: CartDetail[];
}

const Cart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_URL}/cart`);
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "An error occurred");
          return;
        }
        const data = await response.json();
        setCartData(data);
        console.log("Cart fetched successfully:", data); // Add this lin
      } catch (error) {
        console.error("Error fetching cart:", error);
        setErrorMessage("Failed to fetch cart. Please try again later.");
      }
    };
  
    fetchCart();
  }, []);
  

  const renderCartItem = ({ item }: { item: CartDetail }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.course.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.course.courseName}</Text>
        <Text style={styles.coursePrice}>
          {item.course.coursePrice === 0 ? "Free" : `${item.course.coursePrice.toLocaleString()} VND`}
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

  const handleRemoveFromCart = async (cartDetailId: number) => {
    try {
      const response = await fetch(`${API_URL}/cart/update`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing item from cart:", errorData.message || "An error occurred");
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
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : cartData ? (
        <FlatList
          data={cartData.cartDetailList}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.cartDetailId.toString()}
          contentContainerStyle={styles.cartList}
        />
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
