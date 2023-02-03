import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
import Login from "../screens/Login";
import Home from "../screens/Home";
import MarketList from "../screens/MarketList";
import LostItemList from "../screens/LostItemList";
import SecondHandList from "../screens/SecondHandList";
import TapStackRoutes from "./TapStackRoutes";
import HomePageHeader from "../components/HomePageHeader";
const Stack = createStackNavigator();

const MyStack = ({}) => {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator>
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
                        }}
                    />
                    <Stack.Screen name="MarketList" component={MarketList} />
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
                <Stack.Screen name="Login" component={Login} />
            )}
        </Stack.Navigator>
    );
};

export default MyStack;
