import * as React from 'react';
import { View, Text, Button, StyleSheet, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from "./components/SignUp";
import LoginScreen from "./components/login";
import HomeTabs from './components/tabs/home';
import navlist from './components/tabs/navlist';
import Help from './components/tabs/help';
import History from'./components/tabs/history';
import Setting from './components/tabs/setting';

const Wellcome = (props:any) => {
  const {navigation} = props;
  return (
    <View>
      <Text style={{fontSize:40, alignItems: 'center', justifyContent: 'center'}}>Sochidev</Text>
      <Button title='SignUp'
        onPress={() => navigation.navigate("SignUp")}
      />
      <Button title='Login'
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  )
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
          name="home" 
          component={HomeTabs} 
          options={{ title: "Trang chính" }} 
        />
        <Stack.Screen 
          name="navlist" 
          component={navlist} 
        />
        <Stack.Screen 
          name="help" 
          component={Help} 
        />
        <Stack.Screen 
          name="History" 
          component={History}
        />
        <Stack.Screen 
          name="Setting" 
          component={Setting}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;
