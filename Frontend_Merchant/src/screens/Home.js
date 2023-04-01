// Packages
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Components
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
} from "react-native";
import Large from "../components/buttons/Large";
import Logout from "../components/buttons/Logout";
// Configs
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";

const Home = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const { socket } = useContext(SocketContext);

    const handleSetRestaurant = () => {
        navigation.navigate("SetRestaurant");
    };
    const handleSelectRestaurant = () => {
        navigation.navigate("SelectRestaurant");
    };
    const handelModel = () => setVisible(!visible);
    const handleProfile = () => {
        handelModel();
    };
    const handleLogOut = async () => {
        handelModel();
        onAction.signOut();
        socket.disconnect();
        await AsyncStorage.removeItem("M_Token");
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
                        <View style={{ flex: 2 }}>
                            <Text
                                style={[
                                    styles.textHeader,
                                    { color: "#FF4200" },
                                ]}
                            >
                                สวัสดี
                            </Text>
                            <Text style={styles.textHeader} adjustsFontSizeToFit={true} numberOfLines={1}>
                                คุณ {state.userData.given_name}
                            </Text>
                        </View>
                        <Pressable
                            onPress={handleProfile}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            <Image
                                source={{ uri: state.userData.picture }}
                                style={[styles.profile, {}]}
                            />
                        </Pressable>
                    </View>
                    <View style={{ margin: 20 }}>
                        <Large
                            label={"ตั้งร้านค้า"}
                            image={require("../assets/icons/restaurant.png")}
                            onPress={handleSetRestaurant}
                        />
                        <Large
                            label={"เลือกเป็นสมาชิกร้าน"}
                            image={require("../assets/icons/waiter.png")}
                            onPress={handleSelectRestaurant}
                        />
                    </View>
                </View>
            ) : (
                <View></View>
            )}
            {visible ? <Logout onPress={handleLogOut} /> : <View></View>}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    textHeader: {
        fontFamily: "Kanit-Bold",
        fontSize: 38,
    },
    profile: {
        width: 80,
        height: 80,
        overlayColor: "#F5F5F5",
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "gray",
    },
});
