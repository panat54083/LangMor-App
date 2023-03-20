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
import StateBtn from "../../components/buttons/StateBtn";
import CardTwoSide from "../../components/cards/CardTwoSide";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const SecondHistory = ({ navigation }) => {
    //Configs
    const isFocused = useIsFocused();
    const [status, setStatus] = useState(true);
    //Variables
    const { state } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [listSecondHands, setListSecondHands] = useState([]);
    const [listOfChatrooms, setListOfChatrooms] = useState([]);
    const [listOfSecondChats, setListOfSecondChats] = useState([]);

    useEffect(() => {
        if (isFocused) {
            if (status) {
                api_getAllChatrooms("customerId");
            } else {
                api_getAllChatrooms("merchantId");
                api_getMyPosts();
            }
        }
    }, [isFocused, status]);

    useEffect(() => {
        if (!status && listOfChatrooms && listSecondHands) {
            concat_listOfSecondChat();
        }
    }, [status]);

    const concat_listOfSecondChat = () => {
        const tempSecondHand = listSecondHands.map((item, index) => {
            const tempList = listOfChatrooms.filter(
                (data) => data.chatroom.itemId === item._id
            );
            // console.log(index, tempList.length);
            return { secondHand: item, chatrooms: tempList };
        });
        setListOfSecondChats(tempSecondHand);
    };

    const api_getMyPosts = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getMyPosts?owner_id=${
                    state.userData._id
                }&closed=${true}`
            )
            .then((res) => {
                console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const api_getAllChatrooms = (role) => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?${role}=${
                    state.userData._id
                }&&type=${"SecondHand"}&&closed=${true}`
            )
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatrooms)
                if (role === "customerId") {
                    setOrders(res.data.chatrooms);
                } else if (role === "merchantId") {
                    setListOfChatrooms(res.data.chatrooms);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChatroom = (data) => {
        // navigation.navigate("Chat2", {
        //     itemData: data.itemData,
        //     chatroomData: data.chatroom,
        // });
        navigation.navigate("SecondDetail", { secondData: data.itemData, historyChatroomData: data.chatroom });
    };
    const handleChangeStatus = () => {
        setStatus(!status);
    };

    const handleItem = (data) => {
        navigation.navigate("SecondDetail", { secondData: data });
    };

    const handleContact = (data) => {
        navigation.navigate("ChatContact", {
            chatroomsData: data.chatrooms,
            itemData: data.secondHand,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* <Button title="Debugger" onPress={handleDebugger} /> */}
                {orders.length !== 0 &&
                    status &&
                    orders.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Item
                                itemData={item.itemData}
                                onPress={() => handleChatroom(item)}
                                type={"second"}
                            />
                        </View>
                    ))}
                {listOfSecondChats.length !== 0 &&
                    !status &&
                    listOfSecondChats.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <CardTwoSide
                                key={index}
                                label={item.secondHand.name}
                                numberOfContact={item.chatrooms.length}
                                onPressLeft={() => handleItem(item.secondHand)}
                                onPressRight={() => handleContact(item)}
                            />
                        </View>
                    ))}
                {((orders.length === 0 && status) || (listOfSecondChats.length === 0 && !status)) && (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1,
                                alignSelf: "center",
                                // position: "absolute",
                            }}
                        >
                            <MaterialCommunityIcons
                                name="chat-question"
                                size={100}
                                color="#C9C5C4"
                            />
                            <Text style={styles.font}>ไม่พบประวัติ</Text>
                            <Text style={styles.font}>ติดต่อของมือสอง</Text>
                        </View>
                    )}
            </ScrollView>
            <View style={styles.changeButton}>
                <StateBtn
                    label1={"การซื้อ"}
                    label2={"โพสของฉัน"}
                    status={status}
                    onPress={handleChangeStatus}
                />
            </View>
        </View>
    );
};

export default SecondHistory;

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: "0.75%",
        marginBottom: "0.25%",
        width: "90%",
        alignSelf: "center",
    },
    font: {
        fontFamily: "Kanit-Bold",
        fontSize: 25,
        color: "#C9C5C4",
    },
    changeButton: {
        position: "absolute",
        width: "100%",
        bottom: "5%",
        left: "68%",
    },
});
