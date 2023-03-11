//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import Item from "../../components/cards/Item";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const ChatSecondHand = ({ navigation }) => {
    //configs
    const isFocused = useIsFocused();
    const { state } = useContext(UserContext);
    //data
    const [listOfChatrooms, setListOfChatrooms] = useState([]);

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

    const handleChatroom = (data) => {
        navigation.navigate("Chat2", {
            itemData: data.itemData,
            chatroomData: data.chatroom,
        });
    };

    const handleDebugger = () => {
        console.log(listOfChatrooms);
    };
    return (
        <ScrollView>
            {/* <Text>ChatSecondHand</Text> */}
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            {listOfChatrooms.length !== 0 ? (
                listOfChatrooms.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            marginTop: "0.75%",
                            marginBottom: "0.25%",
                            width: "90%",
                            alignSelf: "center",
                        }}
                    >
                        <Item
                            itemData={item.itemData}
                            onPress={() => handleChatroom(item)}
                            type={"second"}
                        />
                    </View>
                ))
            ) : (
                <Text>คุณยังไม่ได้ทำการสั่งซื้อของมือสอง</Text>
            )}
        </ScrollView>
    );
};

export default ChatSecondHand;

const styles = StyleSheet.create({});
