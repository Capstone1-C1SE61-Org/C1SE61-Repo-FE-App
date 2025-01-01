import { API_URL } from "./AuthContextAPI";

// Function to initiate payment
export const initiatePayment = async (cartData: any, token: any) => {
  try {
    const response = await fetch(`${API_URL}/payment`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate payment");
    }

    const paymentData = await response.json();
    return paymentData;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

// Function to confirm successful transaction
export const confirmTransaction = async (tnxRef: any, token: any) => {
  try {
    const response = await fetch(`${API_URL}/transaction/${tnxRef}`, { // Correct interpolation
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to confirm transaction");
    }

    return true;
  } catch (error) {
    console.error("Error confirming transaction:", error);
    throw error;
  }
};

// Function to handle failed transaction
export const handleFailedTransaction = async (tnxRef: any, token: any) => {
  try {
    const response = await fetch(`${API_URL}/fail/${tnxRef}`, { // Correct interpolation
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to handle failed transaction");
    }

    return true;
  } catch (error) {
    console.error("Error handling failed transaction:", error);
    throw error;
  }
};
