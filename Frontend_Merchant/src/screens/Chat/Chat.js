//Packages
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//Components
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Keyboard,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/Cards/Chat/ChatInput";
import MessageModel from "../../components/Cards/Chat/MessageModel";
import AcceptButton from "../../components/buttons/AcceptButton";
import OrderMessage from "../../components/Cards/Chat/OrderMessage";
//Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";

const Chat = ({ navigation, route }) => {
    // config variables
    const { orderData, customerData } = route.params;
    const inputRef = useRef(null);
    const [listMessages, setListMessages] = useState([]);
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollViewRef = useRef(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    // data variables
    const [message, setMessage] = useState("");
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
        chatroom_connect(orderData._id);
    }, [socket]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            }
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (data) => {
                const { id, user, message, timestamp, picture } = data;
                const renew_message = {
                    id,
                    user,
                    message,
                    timestamp,
                    picture,
                };
                setListMessages([...listMessages, renew_message]);
            });
        }

        scrollViewRef.current?.scrollToEnd({ animated: true });
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

    const sendMessage = (message, picture) => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId: orderData._id,
                message: message,
                picture: picture,
            });
        }
        setMessage("");
    };

    const fetchInitialMessages = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/messages?chatroomId=${orderData._id}`
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
        setIsLoaded(true);
        if (image) {
            LIP.handleUpload(image, state.userData._id)
                .then((data) => {
                    sendMessage(message, data);
                    setImage(null);
                    setIsLoaded(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            sendMessage(message, image);
        }
        inputRef.current.clear();
    };

    const handleImagePick = () => {
        LIP.pickImage()
            .then((data) => {
                setImage(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCamera = () => {
        LIP.openCamera()
            .then((data) => {
                setImage(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleStatusButton = () => {
        console.log("press");
    };

    const handleDebugger = () => {
        console.log(orderData, customerData);
    };

    return (
        <View style={styles.main_container}>
            {/* <Button onPress={handleDebugger} title="Debugger" /> */}
            <View style={styles.messages_container}>
                {listMessages[0] ? (
                    <FlatList
                        ref={scrollViewRef}
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
            {!keyboardVisible && (
                <View style={styles.button_container}>
                    <AcceptButton
                        label={"ยืนยันออเดอร์"}
                        onPress={handleStatusButton}
                        fontSize={18}
                        backgroundColor={"#63BE00"}
                    />
                </View>
            )}

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
        margin: 5,
        flex: 10,
    },
    button_container: {
        flex: 0,
        marginVertical: 5,
        marginHorizontal: 40,
    },
});
