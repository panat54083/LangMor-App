import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import SetRestaurant from "../screens/SetRestaurant";

import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
const Stack = createStackNavigator();

function MyStack({}) {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator>
            {state.userData ? (
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            )}
            <Stack.Screen name="SetRestaurant" component={SetRestaurant} />
        </Stack.Navigator>
    );
}

export default MyStack;
