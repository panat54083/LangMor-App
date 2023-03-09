//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const ChatLostItem = ({navigation}) => {
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

    const handleChatroom = (data) => {
        navigation.navigate("Chat2", {
            itemData: data.itemData,
            chatroomData: data.chatroom
        })
    }

        const handleDebugger = () => {
        console.log(listOfChatrooms)
    }
    return (
            <ScrollView>
                <Text>ChatLostItem</Text>
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            {
                listOfChatrooms[0] ? listOfChatrooms.map((item, index)=>(
                    <Button
                    key={index}
                    title={item.itemData.name}
                    onPress={()=> handleChatroom(item)}
                    />
                )) : (
                    <Text>คุณยังไม่ได้ทำรายการติดต่อของหาย</Text>
                )
            }
        </ScrollView>
    );
};

export default ChatLostItem;

const styles = StyleSheet.create({});
