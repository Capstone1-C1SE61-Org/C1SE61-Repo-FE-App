import Account from "@/components/tabs/account";
import HomeTabs from "@/components/tabs/home";
import Navlist from "@/components/tabs/navlist";
import Notification from "@/components/tabs/Notification";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackNav from "./HomeStackNav";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    return (
        // <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = ''; // Đảm bảo iconName là kiểu string

                        // Đặt icon cho từng màn hình
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Menu') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (route.name === 'Notification') {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        } else if (route.name === 'Account') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        // Trả về icon
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home-Nav" component={HomeStackNav} />
                <Tab.Screen name="Menu" component={Navlist} />
                <Tab.Screen name="Notification" component={Notification} />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
        // </NavigationContainer>
    );
}