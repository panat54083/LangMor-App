import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./config/routes";

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
