import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import UserContext from "../hooks/context/UserContext";
import Login from "../screens/Login";
import Home from "../screens/Home";
const Stack = createStackNavigator();


const MyStack = ({}) => {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator>
            {state.userData ? (
                <Stack.Screen name="Home" component={Home} />
            ) : (
                <Stack.Screen name="Login" component={Login} />
            )}
        </Stack.Navigator>
    );
};

export default MyStack;
