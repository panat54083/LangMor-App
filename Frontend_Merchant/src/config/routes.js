import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";

const Stack = createStackNavigator();

function MyStack({}) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default MyStack;
