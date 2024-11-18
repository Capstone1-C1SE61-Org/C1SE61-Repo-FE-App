// g++ -g HelloWorld.cpp -o HelloWorld.exe
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
import { AuthProvider, useAuth } from './api/AuthContextAPI';

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
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Wellcome"
    //       component={Wellcome}
    //       options={{ title: "Trang chủ" }}
    //     />
    //     <Stack.Screen
    //       name="SignUp"
    //       component={SignUpScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="home"
    //       component={HomeTabs}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="navlist"
    //       component={Navlist}
    //       options={{ title: "Menu" }}
    //     />
    //     <Stack.Screen
    //       name="Notification"
    //       component={Notification}
    //       options={{ title: "Thông báo" }}
    //     />
    //     <Stack.Screen
    //       name="Account"
    //       component={Account}
    //       options={{ title: "account" }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="home"
            component={HomeTabs}
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title='Sign Out' />
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
