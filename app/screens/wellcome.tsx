import { Button, Text, View } from "react-native";

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
export default Wellcome;