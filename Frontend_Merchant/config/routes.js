import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

function MyStack({}) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default MyStack;
