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
    ScrollView,
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
    const [buttonStatusLabel, setButtonStatusLabel] = useState("");
    const [buttonStatusColor, setButtonStatusColor] = useState("");

    useEffect(() => {
        navigation.setOptions({
            title: `${customerData.name}`,
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 22,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => {
                        if (orderData.status === "new") {
                            navigation.navigate("OrderTabs", {
                                screen: "NewOrder",
                            });
                        } else if (orderData.status === "doing") {
                            navigation.navigate("OrderTabs", {
                                screen: "DoingOrder",
                            });
                        } else if (orderData.status === "deliver") {
                            navigation.navigate("OrderTabs", {
                                screen: "DeliverOrder",
                            });
                        } else if (orderData.status === "done") {
                            navigation.navigate("OrderTabs", {
                                screen: "DoneOrder",
                            });
                        }
                    }}
                    color="#FF7A00"
                />
            ),
        });
        // Functions
        fetchInitialMessages();
        initialStatusButton();
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

    const apiUpdateOrder = (status) => {
        axios
            .post(`http://${IP_ADDRESS}/order/update`, {
                order_id: orderData._id,
                status: status,
            })
            .then((res) => {
                // console.log(res.data.message);
                console.log("Update Order to: ", res.data.orderData.status);
                orderData.status = res.data.orderData.status;
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

    const initialStatusButton = () => {
        if (orderData.status === "new") {
            setButtonStatusLabel("ยืนยันออเดอร์");
            setButtonStatusColor("#63BE00");
        } else if (orderData.status === "doing") {
            setButtonStatusLabel("กำลังไปส่ง");
            setButtonStatusColor("#FF7A00");
        } else if (orderData.status === "deliver") {
            setButtonStatusLabel("จัดส่งสำเร็จ");
            setButtonStatusColor("#FF7A00");
        } else if (orderData.status === "done") {
            setButtonStatusLabel("ปิดการสนทนา");
            setButtonStatusColor("#FF0101");
        }
    };

    const handleStatusButton = () => {
        let newStatus;
        switch (orderData.status) {
            case "new":
                newStatus = "doing";
                setButtonStatusLabel("กำลังไปส่ง");
                setButtonStatusColor("#FF7A00");
                break;
            case "doing":
                newStatus = "deliver";
                setButtonStatusLabel("จัดส่งสำเร็จ");
                setButtonStatusColor("#FF7A00");
                break;
            case "deliver":
                newStatus = "done";
                setButtonStatusLabel("ปิดการสนทนา");
                setButtonStatusColor("#FF0101");
                break;
            case "done":
                newStatus = "close";
                chatroom_disconnect(orderData._id);
                navigation.navigate("OrderTabs", { screen: "DoneOrder" });
                break;
            default:
                newStatus = "new";
                setButtonStatusLabel("ยืนยันออเดอร์");
                setButtonStatusColor("#63BE00");
                break;
        }
        apiUpdateOrder(newStatus);
    };

    const handleMoreDetail = () => {
        // console.log(orderData.status);
        const order = {order: orderData, customer: customerData}
        navigation.navigate("ShowOrder", order);
    };

    const handleDebugger = () => {
        console.log(orderData);
    };

    return (
        <View style={styles.main_container}>
            {/* <Button onPress={handleDebugger} title="Debugger" /> */}
            <View style={styles.messages_container}>
                {listMessages[0] ? (
                    <ScrollView ref={scrollViewRef}>
                        <View style={styles.orderPopup}>
                            <View
                                style={{
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <OrderMessage
                                    order={orderData}
                                    onPress={handleMoreDetail}
                                    backgroundColor={"#DFDFDF"}
                                />
                            </View>
                        </View>
                        {listMessages.map((item, index) => (
                            <MessageModel
                                key={index}
                                message={item}
                                userId={state.userData._id}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={{ alignItems: "flex-start", width: "100%" }}>
                        <OrderMessage
                            order={orderData}
                            onPress={handleMoreDetail}
                            backgroundColor={"#DFDFDF"}
                        />
                    </View>
                )}
            </View>
            {!keyboardVisible && (
                <View style={styles.button_container}>
                    <AcceptButton
                        // label={
                        //     orderData.status === "new"
                        //         ? "ยืนยันออเดอร์"
                        //         : orderData.status === "doing"
                        //         ? "กำลังไปส่ง"
                        //         : orderData.status === "deliver"
                        //         ? "จัดส่งเสร็จสิ้น"
                        //         : orderData.status === "done"
                        //         ? "ปิดการสนทนา"
                        //         : ""
                        // }
                        label={buttonStatusLabel}
                        onPress={handleStatusButton}
                        fontSize={18}
                        backgroundColor={buttonStatusColor}
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
