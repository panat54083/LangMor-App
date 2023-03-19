//Packages
import React, { useEffect, useState, useContext } from "react";
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

const MyPost = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listLostItems, setListLostItems] = useState([]);
    const [listOfChatrooms, setListOfChatrooms] = useState([]);
    const [listOfLostChats, setListOfLostChats] = useState([]);

    useEffect(() => {
        if (isFocused) {
            api_getMyPosts();
            api_getAllChatrooms();
        }
    }, [isFocused]);

    useEffect(() => {
        if (listOfChatrooms && listLostItems) {
            concat_listOfSecondChat();
        }
    }, [listOfChatrooms, listLostItems]);

    const concat_listOfSecondChat = () => {
        const tempLostItem = listLostItems.map((item, index) => {
            const tempList = listOfChatrooms.filter(
                (data) => data.chatroom.itemId === item._id
            );
            // console.log(index, tempList.length);
            return { lostItem: item, chatrooms: tempList };
        });
        setListOfLostChats(tempLostItem);
    };
    const api_getMyPosts = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/lostItem/getMyPosts?owner_id=${
                    state.userData._id
                }&closed=${false}`
            )
            .then((res) => {
                console.log(res.data.message);
                setListLostItems(res.data.listOfLostItems);
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
                }&type=${"LostItem"}`
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
    const handleAddLost = () => {
        navigation.navigate("AddLost");
    };

    const handleItem = (data) => {
        navigation.navigate("EditPost", { itemData: data });
    };

    const handleContact = (data) => {
        navigation.navigate("ChatContact", {
            chatroomsData: data.chatrooms,
            itemData: data.lostItem,
        });
    };

    const handleDebugger = () => {
        console.log(listOfLostChats);
    };
    return (
        <ScrollView style={styles.scrollView_container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.add_container}>
                <AddButton onPress={handleAddLost} />
            </View>
            <View style={{ marginHorizontal: 16 }}>
                {listOfLostChats.length !== 0 ? (
                    listOfLostChats.map((item, index) => (
                        <CardTwoSide
                            key={index}
                            label={item.lostItem.name}
                            numberOfContact={item.chatrooms.length}
                            onPressLeft={() => handleItem(item.lostItem)}
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
                            เพื่อโพสตามหา/แจ้งพบของหาย
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default MyPost;

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
