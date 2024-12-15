import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { AuthProvider } from "./API/AuthContextAPI";
import AppNav from "./app/(tab)/AppNav";
export default function RootLayout() {
    return (
        <AuthProvider>
            <AppNav />
        </AuthProvider>
    );
}

// const MainLayout = () => {
//     const { authState } = useAuth();
//     const segments = useSegments();
//     const router = useRouter();

//     useEffect(() => {
//         if (authState?.authenticated === null) return;
//         const inApp = segments[0] === '(app)';

//         if (authState?.authenticated && !inApp) {
//             router.replace('/(tabs)/tabNavigation');
//         } else if (authState?.authenticated == false) {
//             router.replace('/Login');
//         }
//     }, [authState?.authenticated,segments,router]);

//     return <Slot />;
// }

