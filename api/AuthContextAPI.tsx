import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (username: string, password: string) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "jwt_token";
export const API_URL = "http://172.26.49.92:8080/api/v1";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (username: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { username, password });
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response.data.msg,
      };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/public/login`, {
        username,
        password,
      });

      console.log("Backend Response:", result.data);

      if (result.data && result.data.token) {
        setAuthState({
          token: result.data.token,
          authenticated: true,
        });

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.token}`;
  
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
  
        return result;
      } else {
        return {
          error: true,
          msg: "No token received from the server",
      };
      }
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response.data.msg,
      };
    }
  };

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";

    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
