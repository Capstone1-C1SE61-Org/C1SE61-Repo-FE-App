import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    userData?: string | null;
    roles?: string[] | null;
  };
  onRegister?: (
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<void>;
}


const TOKEN_KEY = "my_jwt";
export const API_ADDRESS = "http://192.168.1.13:8080"; // nhớ thay đổi địa chỉ
export const API_URL = `${API_ADDRESS}/api/v1`;

const AuthContext = createContext<AuthProps>({});

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Response Error", error);
    const config = error.config;

    if (config && !config.__isRetryRequest) {
      config.__isRetryRequest = true;
      config.retryCount = config.retryCount || 0;

      if (config.retryCount >= 3) {
        return Promise.reject(error);
      }

      config.retryCount += 1;
      const backoffDelay = Math.pow(2, config.retryCount) * 1000;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axiosInstance
            .request(config)
            .then(resolve)
            .catch(reject);
        }, backoffDelay);
      });
    }

    // Nếu server trả lỗi cụ thể, ghi log chi tiết
    console.error("Server Response Error", error.response?.data);

    return Promise.reject(error);
  }
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    userData?: string | null;
    roles?: string[] | null;
  }>({
    token: null,
    authenticated: null,
    userData: null,
    roles: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        console.log("Stored Token:", token);

        if (token) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState((prevState) => ({
            ...prevState,
            token: token,
            authenticated: true,
          }));
        } else {
          setAuthState((prevState) => ({
            ...prevState,
            token: null,
            authenticated: false,
          }));
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };
    loadToken();
  }, []);

  const register = async (
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const response = await axiosInstance.post(`/public/signup`, {
        name,
        username,
        email,
        phone,
        password,
      });
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };
  

  const login = async (username: string, password: string) => {
    try {
      console.log("Starting login request:", { username, password });

      const result = await axiosInstance.post(`/public/login`, { username, password });

      if (!result.data?.token || !result.data?.roles) {
        throw new Error("Invalid response structure");
      }

      const { token, roles, username: userData } = result.data;

      console.log("Login successful, token:", token);

      setAuthState((prevState) => ({
        ...prevState,
        token: token,
        authenticated: true,
        userData: userData,
        roles: roles,
      }));

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, token);

      return { token, roles, userData };
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      delete axiosInstance.defaults.headers.common["Authorization"];
      setAuthState({
        token: null,
        authenticated: false,
        userData: null,
        roles: null,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
