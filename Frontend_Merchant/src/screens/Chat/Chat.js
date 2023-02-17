//Packages
import React, { useEffect, useState, useContext, useRef } from "react";
//Components
import { StyleSheet, Text, View, Button } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/Cards/Chat/ChatInput";
import MessageModel from "../../components/Cards/Chat/MessageModel";
//Configs
import { IP_ADDRESS } from "@env";

const Chat = ({ navigation, route }) => {
    const { chatroomData, customerData } = route.params;
    const [listMessages, setListMessages] = useState([]);
    const inputRef = useRef(null)
    const [message, setMessage] = useState()
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
        // Functions
    }, []);
    const handleSendMessage = () => {
        inputRef.current.clear()
    }
    const handleImagePick = () =>{

    }
    const handleCamera = () => {

    }
    const handleDebugger = () => {
        console.log(chatroomData, customerData);
    };
    return (
        <View style={styles.main_container}>
            <Button onPress={handleDebugger} title="Debugger"/>
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