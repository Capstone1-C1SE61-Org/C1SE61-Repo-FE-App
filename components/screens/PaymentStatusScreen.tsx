import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation, NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { confirmTransaction, handleFailedTransaction } from "../../API/paymentService";
import { useAuth } from "../../API/AuthContextAPI";

interface RouteParams {
  vnp_ResponseCode?: string;
  vnp_TransactionStatus?: string;
  vnp_TxnRef?: string;
}

const PaymentStatusScreen = () => {
  const route = useRoute<RouteProp<{ PaymentStatus: RouteParams }, 'PaymentStatus'>>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { authState } = useAuth();
  const token = authState?.token;

  useEffect(() => {
    const checkTransaction = async () => {
      const params = route.params || {};
      const vnp_ResponseCode = params.vnp_ResponseCode;
      const vnp_TransactionStatus = params.vnp_TransactionStatus;
      const vnp_TxnRef = params.vnp_TxnRef;

      if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
        try {
          await confirmTransaction(vnp_TxnRef, token);
          Alert.alert("Success", "Payment completed successfully!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Cart"),
            },
          ]);
        } catch (error) {
          Alert.alert("Error", "Failed to confirm payment. Please contact support.");
        }
      } else {
        try {
          await handleFailedTransaction(vnp_TxnRef, token);
          Alert.alert("Error", "Payment failed. Please try again.", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Cart"),
            },
          ]);
        } catch (error) {
          Alert.alert("Error", "Failed to handle failed payment. Please contact support.");
        }
      }
    };

    checkTransaction();
  }, [route.params, token, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Processing your payment status...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 16,
    color: "#555",
  },
});

export default PaymentStatusScreen;
