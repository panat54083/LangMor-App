//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const ChatContact = ({ navigation, route }) => {
    const { itemData, chatroomsData } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: "แชท",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 22,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => navigation.goBack()}
                    color="#FF7A00"
                />
            ),
        });
    }, []);

    const api_closeItems = (data) => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/closeItem`, {
                itemData: data,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    console.log("Error", err.response.data.message);
            });
    };

    const handleChatroom = (data) => {
        // console.log(itemData,data.chatroom, data.customer)
        navigation.navigate("Chat2", {
            itemData: itemData,
            chatroomData: data.chatroom,
            customerData: data.customer,
        });
    };
    const handleCloseSecondHand = () => {
        api_closeItems(itemData);
        navigation.goBack()
    };
    const handleDebugger = () => {
        console.log(itemData, chatroomsData);
    };

    return (
        <View>
            <Text>ChatContact</Text>
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            {chatroomsData[0] ? (
                chatroomsData.map((item, index) => (
                    <Button
                        key={index}
                        title={item.customer.name}
                        onPress={() => handleChatroom(item)}
                    />
                ))
            ) : (
                <Text style={styles.alert_font}>No one contacted.</Text>
            )}
            <SubmitBtn
                label={"ปิดการขายสินค้า"}
                onPress={handleCloseSecondHand}
                backgroundColor="#FF0101"
            />
        </View>
    );
};

export default ChatContact;

const styles = StyleSheet.create({});
