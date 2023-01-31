import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/config/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Kanit-Bold": require("./src/assets/fonts/Kanit-Bold.ttf"),
        "Kanit-Medium": require("./src/assets/fonts/Kanit-Medium.ttf"),
        "Kanit-SemiBold": require("./src/assets/fonts/Kanit-SemiBold.ttf"),
    });

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
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
