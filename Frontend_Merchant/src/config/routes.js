import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import HomeTestLogin from "../screens/HomeTestLogin";
import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
const Stack = createStackNavigator();

function MyStack({}) {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator>
            {state.userData ? (
                <Stack.Screen
                    name="HomeTestLogin"
                    component={HomeTestLogin}
                />
            ) : (
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
}

export default MyStack;
