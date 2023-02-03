import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logout from "../components/buttons/Logout";
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";

const Profile = () => {
    const { onAction } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const handleLogOut = async () => {
        onAction.signOut();
        socket.disconnect();
        await AsyncStorage.removeItem("C_Token");
    };
    return (
        <View>
            <Text>Profile</Text>
            <Logout onPress={handleLogOut} />
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({});
