//Packages
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import { StyleSheet, Text, View } from "react-native";
import Logout from "../../components/buttons/Logout";
//Configs
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";

const Setting = () => {
    const { onAction } = useContext(UserContext);
    const { socket } = useContext(SocketContext); 

    const handleLogOut = async () => {
        onAction.signOut();
        socket.disconnect();
        await AsyncStorage.removeItem("M_Token");
    };
    return (
        <View>
            <Text>Setting</Text>
            <Logout onPress={handleLogOut} />
        </View>
    );
};

export default Setting;

const styles = StyleSheet.create({});
