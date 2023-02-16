//packages
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/cards/Chat/ChatInput";
import MessageModel from "../../components/cards/Chat/MessageModel";
//configs
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import { IP_ADDRESS } from "@env";

const Chat = ({ navigation, route }) => {
    const { basketDetail } = useContext(BasketContext);
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const { chatroomData } = route.params;
    const [listMessages, setListMessages] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            title: "หน้าแชท",
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

    useEffect(() => {
        chatroom_connect(chatroomData._id);
    }, [socket]);

    const chatroom_connect = (chatroom_id) => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroom: chatroom_id,
            });
        }
    };

    const chatroom_disconnect = (chatroom_id) => {
        if (socket) {
            socket.emit("leaveRoom", {
                chatroom: chatroom_id,
            });
        }
    };

    const closeChatroom = async () => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/closed`, {
                chatroomId: null,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleGetInfo = () => {
        // connsole.log(basketDetail.foods[0].options);
        console.log(chatroomData);
    };

    return (
        <View style={styles.main_container}>
            <Button onPress={handleGetInfo} title="Press me!!" />
            <View style={styles.messages_container}>
                {listMessages[0] ? (
                    <FlatList
                        data={listMessages}
                        renderItem={({ item }) => (
                            <MessageModel
                                message={item}
                                userId={state.userData._id}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                    />
                ) : (
                    ""
                )}
            </View>
            <ChatInput />
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    messages_container: {
        flex: 10,
    },
});
