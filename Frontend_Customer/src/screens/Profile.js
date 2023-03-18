//Packages
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    Dimensions,
    Alert,
} from "react-native";
import Logout from "../components/buttons/Logout";
import OptionButton from "../components/buttons/OptionButton";
//Configs
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";

const Profile = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
    const { socket } = useContext(SocketContext);

    const handleLogOut = async () => {
        Alert.alert("แจ้งเตือน", `ต้องการออกจากระบบใช่หรือไม่`, [
            {
                text: "ยกเลิก",
                style: "cancel",
            },
            {
                text: "ใช่",
                onPress: () => {
                    const logout = async () => {
                        await AsyncStorage.removeItem("C_Token");
                        socket.disconnect();
                        onAction.signOut();
                    };
                    logout();
                },
            },
        ]);
        // onAction.signOut();
        // socket.disconnect();
        // await AsyncStorage.removeItem("M_Token");
    };
    const handleEditProfile = () => {
        navigation.navigate("EditProfile");
    };
    const handleHistory = () => {
        navigation.navigate("HistoryTabs");
    };
    const handleReport = () => {
        navigation.navigate("Report");
    };
    return (
        <SafeAreaView style={styles.container}>
            {state.userData ? (
                <View>
                    <View
                        style={{
                            margin: 20,
                            flexDirection: "row",
                        }}
                    >
                        <View style={{}}>
                            <Image
                                source={{ uri: state.userData.picture }}
                                style={[styles.profile, {}]}
                            />
                        </View>
                        <View style={{ marginLeft: "5%" }}>
                            <Text
                                style={styles.textHeader}
                                adjustsFontSizeToFit={true}
                                numberOfLines={2}
                            >
                                {state.userData.name}
                            </Text>
                            <Pressable onPress={handleEditProfile}>
                                <Text
                                    style={{
                                        fontFamily: "Kanit-SemiBold",
                                        color: "#9D9693",
                                        textDecorationLine: "underline",
                                    }}
                                >
                                    แก้ไขโปรไฟล์
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View>
                        <OptionButton
                            label={"ประวัติการทำรายการ"}
                            onPress={handleHistory}
                        />
                        <OptionButton
                            label={"รายงานปัญหา"}
                            onPress={handleReport}
                        />
                        <OptionButton
                            label={"ออกจากระบบ"}
                            font_color="red"
                            onPress={handleLogOut}
                        />
                    </View>
                    {/* <Logout onPress={handleLogOut} /> */}
                </View>
            ) : (
                <ActivityIndicator size={"large"} color="#FF4200" />
            )}
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeader: {
        fontFamily: "Kanit-Bold",
        fontSize: 24,
    },
    profile: {
        width: 60,
        height: 60,
        overlayColor: "#F5F5F5",
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "gray",
    },
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
