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
} from "react-native";
import Logout from "../../components/buttons/Logout";
import OptionButton from "../../components/buttons/OptionButton";
//Configs
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import BackScreen from "../../components/buttons/BackScreen";

const Setting = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
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
    const handleEditProfile = () => {
        navigation.navigate("EditProfile")
    };
    const handleReport= () => {
        navigation.navigate("Report")
    };
    const handleEditRestaurant = () => {
        navigation.navigate("EditRestaurant")
    };
    return (
        <View style={styles.container}>
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
                            <Text style={styles.textHeader}>
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
                            label={"แก้ไขข้อมูลร้านค้า"}
                            onPress={handleEditRestaurant}
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
        </View>
    );
};

export default Setting;

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
