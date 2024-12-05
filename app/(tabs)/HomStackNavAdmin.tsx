import Blog from '@/components/screens/blog';
import Help from '@/components/screens/help';
import Setting from '@/components/screens/settings';
import HomeTabs from '@/components/tabs/home';
import { createStackNavigator } from '@react-navigation/stack';
import Wellcome from '../wellcome';
import SignUpScreen from '../SignUp';
import Forgotpassword from '../forgotpass';
import LoginScreen from '../login';

const Stack = createStackNavigator();

export default function HomeStackNavAdmin() {
    return (
     <Stack.Navigator>
            <Stack.Screen name="Wellcome" component={Wellcome}  options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="forgotpass" component={Forgotpassword} />
            <Stack.Screen
                name="Login" 
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={HomeTabs} 
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name="Blog" component={Blog} 
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name="Help" component={Help} 
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name="Setting" component={Setting} 
            options={{
                headerShown:false
            }}
            />
     </Stack.Navigator>
    )
}