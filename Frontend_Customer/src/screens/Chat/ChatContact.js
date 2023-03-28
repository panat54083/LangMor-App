//Packages
import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import ContactBtn from "../../components/buttons/ContactBtn";
//Configs
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import { IP_ADDRESS } from "@env";

const BUTTONS_PER_ROW = 2;

const ChatContact = ({ navigation, route }) => {
    const { itemData, chatroomsData } = route.params;
    const { socket } = useContext(SocketContext);
    // console.log(chatroomsData);
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
        socket_closeChatroom(true);
        navigation.goBack();
    };
    const handleDebugger = () => {
        console.log(itemData, chatroomsData);
    };

    const socket_closeChatroom = useCallback((closed) => {
        if (socket) {
            chatroomsData.map((room, index) => {
                console.log(room.chatroom._id)
                socket.emit("chatroomClose", {
                    chatroomId: room.chatroom._id,
                    closed: closed,
                });
            });
        }
    });

    const renderRow = (chatrooms) => (
        <View style={styles.row} key={chatrooms[0].chatroom._id}>
            {chatrooms.map((chatroom, index) => (
                <ContactBtn
                    key={index}
                    chatroom={chatroom}
                    onPress={() => {
                        handleChatroom(chatroom);
                    }}
                />
            ))}
        </View>
    );

    const rows = [];

    for (let i = 0; i < chatroomsData.length; i += BUTTONS_PER_ROW) {
        const row = chatroomsData.slice(i, i + BUTTONS_PER_ROW);
        rows.push(renderRow(row));
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <Text>ChatContact</Text> */}
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            {chatroomsData.length !== 0 ? (
                <ScrollView>
                    <View
                        style={{
                            paddingBottom: "20%",
                            marginTop: "4%",
                            alignSelf: "center",
                            width: "88%",
                        }}
                    >
                        {rows}
                    </View>
                </ScrollView>
            ) : (
                <Text style={styles.alert_font}>ยังไม่มีผู้ติดต่อ...</Text>
            )}

            <View style={styles.submitBtn}>
                {itemData.closed !== true ? (
                    <SubmitBtn
                        label={"ปิดโพส"}
                        onPress={handleCloseSecondHand}
                        backgroundColor="#FF0101"
                    />
                ) : null}
            </View>
        </View>
    );
};

export default ChatContact;

const styles = StyleSheet.create({
    submitBtn: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        alignSelf: "center",
        marginBottom: "8%",
    },
    alert_font: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        textAlign: "center",
        color: "#C9C5C4",
        position: "absolute",
        alignSelf: "center",
        bottom: "60%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
