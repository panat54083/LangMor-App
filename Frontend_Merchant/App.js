import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/config/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useReducer } from "react";
import UserContext from "./src/hooks/context/UserContext";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Kanit-Bold": require("./src/assets/fonts/Kanit-Bold.ttf"),
        "Kanit-Medium": require("./src/assets/fonts/Kanit-Medium.ttf"),
        "Kanit-SemiBold": require("./src/assets/fonts/Kanit-SemiBold.ttf"),
    });

    const reducer = (prevState, action) => {
        switch (action.type) {
            case "SIGN_IN":
                console.log(action.user);
                return {
                    isSignin: true,
                    userData: action.user,
                };
            case "SIGN_OUT":
                console.log("Hello");
                return {
                    isSignin: false,
                    userData: null,
                };
        }
    };
    const [state, dispatch] = useReducer(reducer, {
        isSignin: false,
        userData: null,
    });

    const onAction = useMemo(
        () => ({
            signIn: async ({ user }) => {
                return dispatch({ type: "SIGN_IN", user: user });
            },
            signOut: () => {
                return dispatch({ type: "SIGN_OUT" });
            },
        }),
        []
    );

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <UserContext.Provider value={{ onAction, state }}>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </UserContext.Provider>
    );
}
