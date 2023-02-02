import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Button,
    Pressable,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";
import Logout from "../components/buttons/Logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fav from "../components/buttons/Fav";
import AddressBox from "../components/buttons/AddressBox";
import BtnToFeature from "../components/buttons/BtnToFeature";
import HomePageHeader from "../components/HomePageHeader";

const Home = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        navigation.setOptions({
            title: `สวัสดีคุณ ${
                state.isSignin ? state.userData.name : "Loading"
            }`,
            headerRight: () => (
                <Pressable onPress={handleProfile}>
                    <HomePageHeader />
                </Pressable>
            ),
            headerStyle: { backgroundColor: "#f5f5f5" },
        });
    }, [visible]);
    const handelModel = () => setVisible(!visible);
    const handleProfile = () => {
        handelModel();
    };
    const handleLogOut = async () => {
        handelModel();
        onAction.signOut();
        socket.disconnect();
        await AsyncStorage.removeItem("C_Token");
    };

    return (
        <View style={styles.mainContainer}>
            {state.isSignin ? (
                <View>
                    <View style={styles.itemheader}>
                        <AddressBox />
                        <Fav />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <BtnToFeature
                            name="สั่งอาหาร"
                            imgSrc={require("../assets/icons/hamburger.png")}
                            navigateToFeature={() => {
                                navigation.navigate("MarketList");
                            }}
                        />
                        <BtnToFeature
                            name="ของมือสอง"
                            imgSrc={require("../assets/icons/second-hand.png")}
                            navigateToFeature={() => {
                                navigation.navigate("LostItemList");
                            }}
                        />
                        <BtnToFeature
                            name="ของหาย"
                            imgSrc={require("../assets/icons/lost-items.png")}
                            navigateToFeature={() => {
                                navigation.navigate("SecondHandList");
                            }}
                        />
                    </View>
                </View>
            ) : null}
            {visible ? <Logout onPress={handleLogOut} /> : null}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    btn: {
        margin: 15,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    itemheader: {
        flexDirection: "row",
        justifyContent: "space-around",
        // backgroundColor:'blue',
        paddingRight: 40,
        marginTop: 14,
        marginBottom: 24,
    },
});
