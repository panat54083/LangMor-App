//Packages
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Button,
    Pressable,
    ScrollView,
} from "react-native";
import Logout from "../components/buttons/Logout";
import Fav from "../components/buttons/Fav";
import AddressBox from "../components/buttons/AddressBox";
import BtnToFeature from "../components/buttons/BtnToFeature";
//Configs
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";
import BasketContext from "../hooks/context/BasketContext";
import HomeHeader from "../components/headers/HomeHeader";
import { IP_ADDRESS } from "@env";

const Home = ({ navigation }) => {
    //config
    const { state, onAction } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const { socket } = useContext(SocketContext);
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    //data
    const [chatrooms, setChatrooms] = useState([]);

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
    const fetchChatrooms = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?customerId=${state.userData._id}`
            )
            .then((res) => {
                // console.log(res.data.message);
                setChatrooms(res.data.chatrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRestaurant = () => {
        navigation.navigate("MarketList");
    };
    const handleSecondHand = () => {
        navigation.navigate("SecondTabs");
    };
    const handleLostItem = () => {
        navigation.navigate("LostTabs");
    };
    const handleDebugger = () => {
        console.log(orders);
    };
    return (
        <View style={styles.mainContainer}>
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            {state.isSignin ? (
                <View>
                    <View style={{ marginTop: "4%", marginBottom: "2%" }}>
                        <HomeHeader user={state.userData} />
                    </View>
                    <ScrollView>
                        <View style={{ alignItems: "center" }}>
                            <BtnToFeature
                                name="สั่งอาหาร"
                                imgSrc={require("../assets/icons/hamburger.png")}
                                navigateToFeature={handleRestaurant}
                            />
                            <BtnToFeature
                                name="ของมือสอง"
                                imgSrc={require("../assets/icons/second-hand.png")}
                                navigateToFeature={handleSecondHand}
                            />
                            <BtnToFeature
                                name="ของหาย"
                                imgSrc={require("../assets/icons/lost-items.png")}
                                navigateToFeature={handleLostItem}
                            />
                        </View>
                    </ScrollView>
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
        width: "100%",
        paddingRight: 40,
        marginTop: 14,
        marginBottom: 24,
    },
});
