import { StatusBar } from "expo-status-bar";
import { useMemo, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import UserContext from "./hooks/context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/config/routes";

export default function App() {
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
    return (
        <UserContext.Provider value={{ onAction, state }}>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </UserContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
