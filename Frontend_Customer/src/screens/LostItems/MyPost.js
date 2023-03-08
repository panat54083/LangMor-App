//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import AddButton from "../../components/buttons/AddButton";
import CardTwoSide from "../../components/cards/CardTwoSide";
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
        const tempLostItem= listLostItems.map((item, index) => {
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
                `http://${IP_ADDRESS}/lostItem/getMyPosts?owner_id=${state.userData._id}`
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

    const handleItem = () => {
        console.log("Item");
    };

    const handleContact = (data) => {
        navigation.navigate("ChatContact",{chatroomsData: data.chatrooms, itemData: data.lostItem});
    };

    const handleDebugger = () => {
        console.log(listOfLostChats)
    };
    return (
        <ScrollView style={styles.scrollView_container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.add_container}>
                <AddButton onPress={handleAddLost} />
            </View>
            <View style={{ marginHorizontal: 16 }}>
                {listOfLostChats.length !== 0 ? listOfLostChats.map((item, index) => (
                    <CardTwoSide
                        key={index}
                        label={item.lostItem.name}
                        numberOfContact={item.chatrooms.length}
                        onPressLeft={handleItem}
                        onPressRight={()=>handleContact(item)}
                    />
                )): null}
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
});
