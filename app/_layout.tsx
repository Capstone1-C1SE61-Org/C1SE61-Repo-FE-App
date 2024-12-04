import { AuthProvider } from "@/context/AuthContextAPI";
import AppNav from "./(tabs)/AppNav";

export default function RootLayout() {
    return (
        <AuthProvider>
            <AppNav />
        </AuthProvider>
    );
}
