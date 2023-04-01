//packages
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
import ImageView from "react-native-image-viewing";
//components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Pressable,
    Image,
    TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/cards/Chat/ChatInput";
import MessageModel from "../../components/cards/Chat/MessageModel";
import DetailRgint from "../../components/buttons/DetailRgint";
//configs
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import { API_URL } from "@env";

const Chat2 = ({ navigation, route }) => {
    //Initial Data
    const { itemData, chatroomData, customerData } = route.params;
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    //Configs
    const [listOfMessages, setListOfMessages] = useState([]);
    const scrollViewRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const inputRef = useRef(null);
    const [showImage, setShowImage] = useState(false);
    //Data
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: customerData ? `${customerData.name}` : `${itemData.name}`,
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
            headerRight: () => (
                <>
                    {chatroomData.type === "SecondHand" &&
                        chatroomData.closed === false && (
                            <DetailRgint
                                onPress={() => {
                                    navigation.navigate("SecondDetail", {
                                        secondData: itemData,
                                    });
                                }}
                                color="#FF7A00"
                            />
                        )}
                    {chatroomData.type === "LostItem" &&
                        chatroomData.closed === false && (
                            <DetailRgint
                                onPress={() => {
                                    navigation.navigate("LostDetail", {
                                        lostData: itemData,
                                    });
                                }}
                                color="#FF7A00"
                            />
                        )}
                </>
            ),
        });
        // Functions
        api_initialMessages();
    }, []);

    useEffect(() => {
        socket_chatroomConnect(chatroomData._id);
    }, [socket]);

    useEffect(() => {
        // if (socket) {
        //     socket.on("newMessage", (data) => {
        //         const { id, user, message, timestamp, picture } = data;
        //         const renew_message = {
        //             id,
        //             user,
        //             message,
        //             timestamp,
        //             picture,
        //         };
        //         setListOfMessages([...listOfMessages, renew_message]);
        //     });
        // }
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [listOfMessages]);

    useEffect(() => {
        if (socket) {
            socket.on("closedChatroom", ({ closed }) => {
                console.log(closed);
                if (closed) {
                    socket_chatroomDisconnect(chatroomData._id);
                    navigation.goBack();
                    // handleGoBack();
                }
            });
            socket.on("newMessage", (data) => {
                const { id, user, message, timestamp, picture } = data;
                console.log("recieve message: ", message);
                const renew_message = {
                    id,
                    user,
                    message,
                    timestamp,
                    picture,
                };
                setListOfMessages((prevMessages) => [
                    ...prevMessages,
                    renew_message,
                ]);
            });
        }
    }, [socket]);

    // const api_initialMessages = () => {
    //     axios
    //         .get(
    //             `${API_URL}/chatroom/messages?chatroomId=${chatroomData._id}`
    //         )
    //         .then((res) => {
    //             // console.log(res.data.messages)
    //             setListOfMessages(res.data.messages);
    //         })
    //         .catch((err) => {
    //             if (
    //                 err &&
    //                 err.response &&
    //                 err.response.data &&
    //                 err.response.data.message
    //             )
    //                 console.log("Error", err.response.data.message);
    //         });
    // };
    const api_initialMessages = useCallback(() => {
        axios
            .get(`${API_URL}/chatroom/messages?chatroomId=${chatroomData._id}`)
            .then((res) => {
                setListOfMessages(res.data.messages);
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
    }, [chatroomData]);

    const socket_chatroomConnect = (chatroom_id) => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroom: chatroom_id,
            });
        }
    };
    const socket_chatroomDisconnect = (chatroom_id) => {
        if (socket) {
            socket.emit("leaveRoom", {
                chatroom: chatroom_id,
            });
        }
    };
    // const socket_sendMessage = (message, picture) => {
    //     if (socket) {
    //         socket.emit("chatroomMessage", {
    //             chatroomId: chatroomData._id,
    //             message: message,
    //             picture: picture,
    //         });
    //     }
    //     setMessage("");
    // };
    const socket_sendMessage = useCallback(
        (message, picture) => {
            if (socket) {
                socket.emit("chatroomMessage", {
                    chatroomId: chatroomData._id,
                    message: message,
                    picture: picture,
                });
            }
            setMessage("");
        },
        [socket, chatroomData]
    );
    const handleSendMessage = () => {
        setIsLoaded(true);
        if (image) {
            LIP.handleUpload(image, state.userData._id)
                .then((data) => {
                    socket_sendMessage(message, data);
                    setImage(null);
                    setIsLoaded(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            socket_sendMessage(message, null);
            setIsLoaded(false);
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
    const handleClosedImage = () => {
        setImage(null);
    };
    const handleDebugger = () => {
        console.log(itemData);
    };
    const handleImage = (imageData) => {
        console.log(imageData);
        // navigation.navigate("ShowImage", {imageData: imageData})
    };

    return (
        <View style={styles.main_container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.messages_container}>
                {listOfMessages[0] ? (
                    <ScrollView ref={scrollViewRef}>
                        {listOfMessages.map((item, index) => (
                            <MessageModel
                                key={index}
                                message={item}
                                userId={state.userData._id}
                                onPressImage={(item) => handleImage(item)}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    ""
                )}
            </View>
            {image && (
                <View
                    style={{
                        marginLeft: 5,
                        marginTop: 10,
                        backgroundColor: "white",
                        borderWidth: 3,
                        borderRadius: 5,
                        borderColor: "#FF7A00",
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 100,
                    }}
                >
                    <Pressable onPress={() => setShowImage(true)}>
                        <Image
                            source={{
                                uri: `data:${image.type}/jpg;base64,${image.base64}`,
                            }}
                            style={{ width: 100, height: 100 }}
                        />
                        <ImageView
                            images={[
                                {
                                    uri: `data:${image.type}/jpg;base64,${image.base64}`,
                                },
                            ]}
                            imageIndex={0}
                            visible={showImage}
                            onRequestClose={() => setShowImage(false)}
                        />
                    </Pressable>
                    <Pressable
                        onPress={handleClosedImage}
                        style={{
                            position: "absolute",
                            backgroundColor: "white",
                            borderRadius: 40,
                            // alignSelf: "flex-end",
                            marginLeft: 90,
                            marginTop: -10,
                        }}
                    >
                        <Entypo
                            name="circle-with-cross"
                            size={24}
                            color="#FF0101"
                        />
                    </Pressable>
                </View>
            )}
            {!itemData.closed ? (
                <ChatInput
                    forwardedRef={inputRef}
                    onChangeText={(value) => setMessage(value)}
                    sendOnPress={handleSendMessage}
                    pictureOnPress={handleImagePick}
                    cameraOnPress={handleCamera}
                    isLoaded={isLoaded}
                />
            ) : (
                ""
            )}
        </View>
    );
};

export default Chat2;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    messages_container: {
        margin: 5,
        flex: 10,
    },
});
