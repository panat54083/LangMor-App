//Packages
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Logout from "../../components/buttons/Logout";
//Configs
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import BackScreen from "../../components/buttons/BackScreen";

const Setting = ({ navigation }) => {
    const { onAction } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(() => {
        navigation.setOptions({
            title: "การตั้งค่า",
            headerStyle: {
                backgroundColor: "#FF7A00",
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 24,
            },
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} />
            ),
        });
        setIsLoaded(false);
    }, []);
    const handleLogOut = async () => {
        onAction.signOut();
        socket.disconnect();
        await AsyncStorage.removeItem("M_Token");
    };
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            {isLoaded ? (
                <View>
                    <ActivityIndicator size={"large"} color="#FF4200" />
                </View>
            ) : (
                <Logout onPress={handleLogOut} />
            )}
        </View>
    );
};

export default Setting;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
