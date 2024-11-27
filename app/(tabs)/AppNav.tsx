import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wellcome from "../screens/wellcome";
import { useAuth } from "../../api/AuthContextAPI";
import HomeTabs from "../../components/tabs/home";
import { Button } from "react-native";
import SignUpScreen from "../screens/SignUp";
import LoginScreen from "../screens/login";

const Stack = createNativeStackNavigator();
function AppNav() {
    const { authState, onLogout } = useAuth();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Wellcome">
                <Stack.Screen name="Wellcome" component={Wellcome} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
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
export default AppNav;