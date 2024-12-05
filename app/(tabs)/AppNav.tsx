import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/context/AuthContextAPI";
import Wellcome from "../wellcome";
import { Button } from "react-native";
import LoginScreen from "../login";
import SignUpScreen from "../SignUp";
import TabLayout from "./tabNavigation";
import Forgotpassword from "../forgotpass";
import HomeStackNav from "./HomeStackNav";
import HomeStackNavAdmin from "./HomStackNavAdmin";

const Stack = createNativeStackNavigator();
// function AppNav() {
//     const { authState, onLogout } = useAuth();
//     return (
//         // <NavigationContainer>
//         <Stack.Navigator>
//             <Stack.Screen name="Wellcome" component={Wellcome} />
//             <Stack.Screen name="SignUp" component={SignUpScreen} />
//             <Stack.Screen name="forgotpass" component={Forgotpassword} />
//             <Stack.Screen
//                 name="Login" 
//                 component={LoginScreen}
//                 options={{ headerShown: false }}
//             />
//             {authState?.authenticated ? (
//                 <Stack.Screen
//                     name="home"
//                     component={TabLayout}
//                     options={{
//                         headerShown: false,
//                         headerRight: () => <Button onPress={onLogout} title='Sign Out' />
//                     }}
//                 />
//             ) : null}
//         </Stack.Navigator>
//         // </NavigationContainer>
//     );
// }

function AppNav () {
    const {authState} = useAuth();

    // if(isLoading){
    //     return(
    //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //             <ActivityIndicator size={'large'} />
    //         </View>
    //     )
    // }

    return( 
       // <NavigationContainer independent={true} >
            <Stack.Navigator>
            {authState?.authenticated ? (
                    authState.userData && authState.userData.roles && authState.userData.roles.includes("ROLE_ADMIN") ? (
                        <Stack.Screen name="Home" component={HomeStackNavAdmin} options={{ headerShown: false }} />
                    ) : (
                        <Stack.Screen name="Home" component={HomeStackNav} options={{ headerShown: false }} />
                    )
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )
                
                }
            </Stack.Navigator>
      //  </NavigationContainer>
    )
}
export default AppNav;