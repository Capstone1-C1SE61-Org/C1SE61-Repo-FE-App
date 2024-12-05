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

const TOKEN_KEY = 'my_jwt';
export const API_ADDRESS = "http://172.26.66.18:8080";
export const API_URL = `${API_ADDRESS}/api/v1`

const AuthContext = createContext<AuthProps>({});

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log('Response Error', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    if (config && !config.__isRetryRequest) {
      config.__isRetryRequest = true;
      config.retryCount = config.retryCount || 0;

      if (config.retryCount >= 3) {
        return Promise.reject(error);
      }

      config.retryCount += 1;
      const backoffDelay = Math.pow(2, config.retryCount) * 1000; // Exponential backoff

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axiosInstance.request(config).then(resolve).catch(reject);
        }, backoffDelay);
      });
    }
    return Promise.reject(error);
  }
);

export const useAuth = () => {
  return useContext(AuthContext);
}

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
        setAuthState(prevState => ({
          ...prevState,
          token: token,
          authenticated: true
        }));
      } else {
        setAuthState(prevState => ({
          ...prevState,
          token: null,
          authenticated: false
        }));
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
      console.log("Starting login request", { username, password });

      let result;
      let token;

      result = await axiosInstance.post('/public/login', { username, password });
      console.log('login response:', result);
      token = result.data.token;

      if (!token) {
        throw new Error("No token found");
      }

      console.log("Login successful, token:", token);

      setAuthState(prevState => ({
        ...prevState,
        token: token,
        authenticated: true
      }));

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, token.toString());

      return result;


    } catch (e) {
      console.error("Login error: ", e);
      throw e;
    }
  }

  const logout = async () => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axiosInstance.defaults.headers.common['Authorization'] = '';
        setAuthState(prevState => ({
            ...prevState,
            token: null,
            authenticated: false
        }));
    } catch (error) {
        console.error("Logout error: ", error); 
    }
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
