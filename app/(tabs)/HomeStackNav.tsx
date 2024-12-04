import HomeTabs from '@/components/tabs/home';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeStackNav() {
    return (
     <Stack.Navigator>
        <Stack.Screen name='home' component={HomeTabs} 
        options={{
            headerShown:false
        }}
        />
     </Stack.Navigator>
    )
}