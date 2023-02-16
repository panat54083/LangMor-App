//Packages
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import { IP_ADDRESS } from "@env";

const Home = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const { socket } = useContext(SocketContext);
    const [chatrooms, setChatrooms] = useState([]);
    useEffect(() => {
        fetchChatrooms();
    }, []);

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
    return (
        <View style={styles.mainContainer}>
            {state.isSignin ? (
                <View>
                    <ScrollView>
                        {chatrooms.map((room, index) => (
                            <Button
                                key={index}
                                title={room.restaurantId}
                                onPress={() => {
                                    navigation.navigate("Chat", {
                                        chatroomData: room,
                                    });
                                }}
                            />
                        ))}
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
