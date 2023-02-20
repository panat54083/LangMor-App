//Packages
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//Components
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/Cards/Chat/ChatInput";
import MessageModel from "../../components/Cards/Chat/MessageModel";
//Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";

const Chat = ({ navigation, route }) => {
    // config variables
    const { chatroomData, customerData } = route.params;
    const inputRef = useRef(null);
    const [listMessages, setListMessages] = useState([]);
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    // data variables
    const [message, setMessage] = useState();
    const [image, setImage] = useState(null);
    useEffect(() => {
        navigation.setOptions({
            title: `${customerData.name}`,
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
        fetchInitialMessages();
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
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/messages?chatroomId=${chatroomData._id}`
            )
            .then((res) => {
                // console.log(res.data.messages)
                setListMessages(res.data.messages);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSendMessage = () => {
        sendMessage(message);
        inputRef.current.clear();
    };
    const handleImagePick = () => {
        LIP.pickImage()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleCamera = () => {
        LIP.openCamera()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDebugger = () => {
        console.log(chatroomData, customerData);
    };
    return (
        <View style={styles.main_container}>
            <Button onPress={handleDebugger} title="Debugger" />
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
