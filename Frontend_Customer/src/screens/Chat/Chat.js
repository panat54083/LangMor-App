//packages
import React, { useContext, useEffect, useRef, useState } from "react";
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
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);
    useEffect(() => {
        navigation.setOptions({
            title: `${basketDetail.restaurant.name}`,
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
        // Functions
        fetchInitialMessages()
    }, []);

    useEffect(() => {
        chatroom_connect(chatroomData._id);
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (data) => {
                const { id, user, message, timestamp } = data;
                const renew_message = {
                    id,
                    user,
                    message,
                    timestamp,
                };
                setListMessages([...listMessages, renew_message]);
            });
        }
    }, [listMessages]);

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
    const sendMessage = (message) => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId: chatroomData._id,
                message: message,
            });
        }
        setMessage("");
    };
    const fetchInitialMessages = () => {
        axios.get(
            `http://${IP_ADDRESS}/chatroom/messages?chatroomId=${chatroomData._id}`
        ).then((res)=>{
            // console.log(res.data.messages)
            setListMessages(res.data.messages)
        }).catch((err)=>{
            console.log(err)
        })
    };
    const handleSendMessage = () => {
        sendMessage(message);
        inputRef.current.clear();
    };
    const handleImagePick = () => {
        console.log("Image picker");
    };
    const handleCamera = () => {
        console.log("Camera");
    };
    const handleGetInfo = () => {
        // console.log(chatroomData);
    };

    return (
        <View style={styles.main_container}>
            <Button onPress={handleGetInfo} title="Debugger"/>
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
            <ChatInput
                forwardedRef={inputRef}
                onChangeText={(value) => setMessage(value)}
                sendOnPress={handleSendMessage}
                pictureOnPress={handleImagePick}
                cameraOnPress={handleCamera}
            />
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
