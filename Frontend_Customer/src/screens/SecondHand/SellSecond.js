//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import AddButton from "../../components/buttons/AddButton";
import CardTwoSide from "../../components/cards/CardTwoSide";
import { FontAwesome5 } from "@expo/vector-icons";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const SellSecond = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listSecondHands, setListSecondHands] = useState([]);
    const [listOfChatrooms, setListOfChatrooms] = useState([]);
    const [listOfSecondChats, setListOfSecondChats] = useState([]);

    useEffect(() => {
        if (isFocused) {
            api_getMyPosts();
            api_getAllChatrooms();
        }
    }, [isFocused]);

    useEffect(() => {
        if (listOfChatrooms && listSecondHands) {
            concat_listOfSecondChat();
        }
    }, [listOfChatrooms, listSecondHands]);

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
                }&closed=${false}`
            )
            .then((res) => {
                console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const api_getAllChatrooms = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?merchantId=${
                    state.userData._id
                }&type=${"SecondHand"}`
            )
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatrooms)
                setListOfChatrooms(res.data.chatrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddSecond = () => {
        navigation.navigate("AddSecond");
    };

    const handleItem = (data) => {
        navigation.navigate("EditSecond", { itemData: data.secondHand });
    };

    const handleContact = (data) => {
        navigation.navigate("ChatContact", {
            chatroomsData: data.chatrooms,
            itemData: data.secondHand,
        });
    };

    const handleDebugger = () => {
        concat_listOfSecondChat();
        // api_getAllChatrooms()
        // console.log(listOfChatrooms.length)
    };

    return (
        <ScrollView style={styles.scrollView_container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.add_container}>
                <AddButton onPress={handleAddSecond} />
            </View>
            <View style={{ marginHorizontal: 16 }}>
                {listOfSecondChats.length !== 0 ? (
                    listOfSecondChats.map((item, index) => (
                        <CardTwoSide
                            key={index}
                            label={item.secondHand.name}
                            numberOfContact={item.chatrooms.length}
                            onPressLeft={() => handleItem(item)}
                            onPressRight={() => handleContact(item)}
                        />
                    ))
                ) : (
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <View style={{ marginVertical: "10%" }}>
                            <FontAwesome5
                                name="hand-point-up"
                                size={70}
                                color="#9D9693"
                            />
                        </View>
                        <Text style={[styles.header, { color: "#9D9693" }]}>
                            กดปุ่ม <Text style={{ color: "#FF7A00" }}>+</Text>{" "}
                            ด้านบน
                        </Text>
                        <Text style={[styles.header, { color: "#9D9693" }]}>
                            เพื่อเพิ่มรายการสินค้ามือสอง
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default SellSecond;

const styles = StyleSheet.create({
    scrollView_container: {
        flex: 1,
    },
    add_container: {
        marginHorizontal: 15,
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
        margin: 10,
        color: "#1A0700",
    },
});

const dum = [
    [{ chatrooms: [Array], secondHand: [Object] }],
    [{ chatrooms: [Array], secondHand: [Object] }],
    [{ chatrooms: [Array], secondHand: [Object] }],
];
