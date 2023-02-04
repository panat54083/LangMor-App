// Packages
import { createStackNavigator } from "@react-navigation/stack";
// Hooks
import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
// Screens
import Login from "../screens/Login";
import Home from "../screens/Home";
import SetRestaurant from "../screens/Introductions/SetRestaurant";
import HomeManage from "../screens/HomeManage";

// Configs
const Stack = createStackNavigator();

function MyStack({}) {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator>
            {state.userData ? (
                <>
                    {state.userData.have_restaurant ? (
                        <>
                            <Stack.Screen
                                name="HomeManage"
                                component={HomeManage}
                                options={{ headerShown: false }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SetRestaurant"
                                component={SetRestaurant}
                            />
                        </>
                    )}
                </>
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
