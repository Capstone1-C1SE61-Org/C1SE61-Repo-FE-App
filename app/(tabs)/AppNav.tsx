import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/context/AuthContextAPI";
import { NavigationContainer } from "@react-navigation/native";
import Wellcome from "../wellcome";
import { Button } from "react-native";
import LoginScreen from "../login";
import SignUpScreen from "../SignUp";
import TabLayout from "./tabNavigation";

const Stack = createNativeStackNavigator();
function AppNav() {
    const { authState, onLogout } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Wellcome" component={Wellcome} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                {authState?.authenticated ? (
                    <Stack.Screen
                        name="home"
                        component={TabLayout}
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