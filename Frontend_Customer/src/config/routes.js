import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import UserContext from "../../hooks/context/UserContext";
import GoogleLogin from "../screens/GoogleLogin";
import Home from "../screens/Home";
const Stack = createStackNavigator();


const MyStack = ({}) => {
    const { state } = useContext(UserContext);
    return (
        <Stack.Navigator>
            {state.userData ? (
                <Stack.Screen name="Home" component={Home} />
            ) : (
                <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
            )}
        </Stack.Navigator>
    );
};

export default MyStack;
