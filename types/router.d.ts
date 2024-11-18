// router.d.ts

export type RootStackParamList = {
  LoginScreen: undefined; // Màn hình Home không có tham số
  Details: { userId: string }; // Màn hình Details yêu cầu tham số userId
  Profile: { userName: string; age?: number }; // Màn hình Profile với tham số không bắt buộc
};

// Sau đó import các types từ react-navigation
import { NavigationProp } from "@react-navigation/native";
import LoginScreen from "../components/login";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

import { createDrawerNavigator } from "@react-navigation/drawer";

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});
