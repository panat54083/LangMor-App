import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import TapStackRoutes from "./TapStackRoutes";
import HomePageHeader from "../components/HomePageHeader";
//screens
import Login from "../screens/Login";
import MarketList from "../screens/restaurant/MarketList";
import FoodList from "../screens/restaurant/FoodList";
import LostItemList from "../screens/LostItemList";
import SecondHandList from "../screens/SecondHandList";
import FoodDetail from "../screens/restaurant/FoodDetail";
import Cart from "../screens/restaurant/Cart";
import Chat from "../screens/Chat/Chat";
import ShowOrder from "../screens/restaurant/ShowOrder";
//config
const Stack = createStackNavigator();

const MyStack = ({}) => {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: "#F5F5F5" },
            }}
        >
            {state.userData ? (
                <>
                    <Stack.Screen
                        name="TapStackRoutes"
                        component={TapStackRoutes}
                        options={{
                            title: `สวัสดีคุณ ${
                                state.isSignin ? state.userData.name : "Loading"
                            }`,
                            headerRight: () => <HomePageHeader />,
                            headerTitleStyle: {
                                fontFamily: "Kanit-Bold",
                            },
                        }}
                    />
                    <Stack.Screen name="MarketList" component={MarketList} />
                    <Stack.Screen
                        name="FoodList"
                        component={FoodList}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FoodDetail"
                        component={FoodDetail}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="ShowOrder" component={ShowOrder} />
                    <Stack.Screen
                        name="LostItemList"
                        component={LostItemList}
                    />
                    <Stack.Screen
                        name="SecondHandList"
                        component={SecondHandList}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default MyStack;
