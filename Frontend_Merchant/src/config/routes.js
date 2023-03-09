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
import Congrat from "../screens/Introductions/Congrat";
import Setting from "../screens/settings/Setting";
import SelectRestaurant from "../screens/Introductions/SelectRestaurant";
import AddMenu from "../screens/Menu/AddMenu";
import AddOptions from "../screens/Menu/AddOptions";
import Chat from "../screens/Chat/Chat";
import ShowOrder from "../screens/Orders/ShowOrder";
import SetImageRestaurant from "../screens/Introductions/SetImageRestaurant";
import History from "../screens/History";
// Taps
import MenuTabs from "./Tabs/MenuTabs";
import OrderTabs from "./Tabs/OrderTabs";
// Configs
const Stack = createStackNavigator();

function MyStack({}) {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator
            screenOptions={{
                // headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: "#F5F5F5" },
            }}
        >
            {state.userData ? (
                <>
                    {state.userData.restaurant ? (
                        <>
                            <Stack.Screen
                                name="HomeManage"
                                component={HomeManage}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name="Setting" component={Setting} />
                            <Stack.Screen
                                name="MenuTabs"
                                component={MenuTabs}
                            />
                            <Stack.Screen
                                name="OrderTabs"
                                component={OrderTabs}
                            />
                            <Stack.Screen name="AddMenu" component={AddMenu} />
                            <Stack.Screen
                                name="AddOptions"
                                component={AddOptions}
                            />
                            <Stack.Screen
                                name="Chat"
                                component={Chat}
                            />
                            <Stack.Screen
                                name="ShowOrder"
                                component={ShowOrder}
                            />
                            <Stack.Screen
                                name="History"
                                component={History}
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
                            <Stack.Screen
                                name="SelectRestaurant"
                                component={SelectRestaurant}
                            />
                            <Stack.Screen
                                name="SetImageRestaurant"
                                component={SetImageRestaurant}
                            />
                            <Stack.Screen
                                name="Congrat"
                                component={Congrat}
                                options={{ headerShown: false }}
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
