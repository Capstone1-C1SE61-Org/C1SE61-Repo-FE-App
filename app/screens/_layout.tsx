import AppNav from "../(tabs)/AppNav";
import { AuthProvider } from "../../api/AuthContextAPI";

export default function RootLayout() {
    return (
        <AuthProvider>
            <AppNav />
        </AuthProvider>
    );
}