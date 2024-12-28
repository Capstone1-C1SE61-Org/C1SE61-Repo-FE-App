import * as React from 'react';
import { View, Text, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from "../../components/SignUp";
import LoginScreen from "../../components/login";
import HomeTabs from '../../components/tabs/home';
import Navlist from '../../components/tabs/navlist';
import Notification from '../../components/tabs/Notification';
import Account from '../../components/tabs/account';
import hamC from '../../components/lessonNN/java/ham';
import Forgotpassword from '../../components/forgotpassword';
import History from '../../components/screens/history';
import Help from '../../components/screens/help';
import Setting from '../../components/screens/settings';
import Blog from '../../components/screens/blog';
import LearningRoadmap from '../../components/tabs/learningroadmap';
import TermsAndPolicies from '../../components/screens/terms';
import Cart from '../../components/screens/cart';
import Gioitheu from '../../components/lessonNN/Cshrap/content';
import CourseDetails from '../../components/lessonNN/Cshrap/content';


function Wellcome(props : any) {
  const { navigation } = props;

  const handleRegister = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground 
      source={require('../../assets/img/p3l.png')} 
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Làm tối hình nền
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#fff',
            textShadowColor: 'black',
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 3,
            marginBottom: 40,
          }}
        >
          Welcome to P3L
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#634a9e',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginVertical: 10,
            width: '80%',
            alignItems: 'center',
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Đăng ký
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#634a9e',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginVertical: 10,
            width: '80%',
            alignItems: 'center',
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Forgotpassword"
          component={Forgotpassword}
          options={{ title: "quên mật khẩu" }}
        />
        <Stack.Screen
          name="home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="navlist"
          component={Navlist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LearningRoadmap"
          component={LearningRoadmap}
          options={{ title: "chia sẻ kiến thức" }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ title: "Thông báo" }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ title: "Trang cá nhân" }}
        />
        <Stack.Screen
          name="hamC"
          component={hamC}
          options={{ title: "Lập Trình JavaScript Cơ Bản" }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ title: "Khóa học đã đăng ký" }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ title: "Trợ Giúp" }}
        />
        <Stack.Screen
          name="Settings"
          component={Setting}
          options={{ title: "Cài đặt chung" }}
        />
        <Stack.Screen
          name="Blog"
          component={Blog}
          options={{ title: "blog" }}
        />
        <Stack.Screen
          name="TermsAndPolicies"
          component={TermsAndPolicies}
          options={{ title: "Điều khoản & chính sách" }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: "Giỏ hàng" }}
        />
          <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={{ title: "Giới thiệu C#" }}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
