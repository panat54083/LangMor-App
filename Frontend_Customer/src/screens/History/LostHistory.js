import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    SectionList,
} from "react-native";
//Components
import Item from "../../components/cards/Item";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const LostHistory = ({ navigation }) => {
    //Configs
    const isFocused = useIsFocused();
    //Variables
    const { state } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (isFocused) {
            api_getAllChatrooms();
        }
    }, [isFocused]);

    const api_getAllChatrooms = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?customerId=${
                    state.userData._id
                }&type=${"LostItem"}&closed=${"true"}`
            )
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatrooms)
                setOrders(res.data.chatrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };
        const handleChatroom = (data) => {
        navigation.navigate("Chat2", {
            itemData: data.itemData,
            chatroomData: data.chatroom,
        });
    };

    return (
        <View>
            {/* <Text>ChatLostItem</Text>
    <Button title="Debugger" onPress={handleDebugger} /> */}
            {orders.length !== 0 ? (
                orders.map((item, index) => (
                    <ScrollView key={index}>
                        <View
                            style={{
                                marginTop: "0.75%",
                                marginBottom: "0.25%",
                                marginBottom: 5,
                                width: "90%",
                                alignSelf: "center",
                            }}
                        >
                            <Item
                                itemData={item.itemData}
                                onPress={() => {
                                    handleChatroom(item);
                                }}
                                type={"lost"}
                            />
                        </View>
                    </ScrollView>
                ))
            ) : (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        alignSelf:"center",
                        position:"absolute",
                    }}
                >
                    <MaterialCommunityIcons
                        name="chat-question"
                        size={100}
                        color="#C9C5C4"
                    />
                    <Text style={styles.font}>ไม่พบประวัติ</Text>
                    <Text style={styles.font}>ติดต่อของหาย</Text>
                </View>
            )}
        </View>
    );
};

export default LostHistory;

const styles = StyleSheet.create({
    font: {
        fontFamily: "Kanit-Bold",
        fontSize: 25,
        color: "#C9C5C4",
    },
});