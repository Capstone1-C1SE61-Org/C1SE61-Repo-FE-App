import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from "./components/SignUp";
import LoginScreen from "./components/login";
import HomeTabs from './components/tabs/home';
import Navlist from './components/tabs/navlist';
import Notification from './components/tabs/Notification';
import Account from './components/tabs/account';
import hamC from './components/lessonNN/java/ham';
import Forgotpassword from './components/forgotpassword';
import History from './components/screens/history';
import Help from './components/screens/help';
import Setting from './components/screens/settings';
import Blog from './components/screens/blog';
import LearningRoadmap from './components/tabs/learningroadmap';


function Wellcome(props: any) {
  const { navigation } = props;
  return (
    <View>
      <Text style={{ fontSize: 40, alignItems: 'center', justifyContent: 'center' }}>Sochidev</Text>
      <Button title='SignUp'
        onPress={() => navigation.navigate("SignUp")} />
      <Button title='Login'
        onPress={() => navigation.navigate("Login")} />
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Wellcome"
          component={Wellcome}
          options={{ title: "Trang chủ" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Đăng ký" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Đăng nhập" }}
        />
          <Stack.Screen
          name="Forgotpassword"
          component={Forgotpassword}
          options={{ title: "quên mật khẩu" }}
        />
        <Stack.Screen
          name="home"
          component={HomeTabs}
          options={{ title: "Trang chính" }}
        />
        <Stack.Screen
          name="navlist"
          component={Navlist}
          options={{ title: "Menu" }}
        />
        <Stack.Screen
          name="LearningRoadmap"
          component={LearningRoadmap}
          options={{ title: "Learningroadmap" }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ title: "Thông báo" }}
        />
         
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ title: "account" }}
        />
        <Stack.Screen
          name="hamC"
          component={hamC}
          options={{ title: "Lập Trình JavaScript Cơ Bản" }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ title: "history" }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ title: "help" }}
        />
        <Stack.Screen
          name="Settings"
          component={Setting}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="Blog"
          component={Blog}
          options={{ title: "blog" }}
        />
      

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
