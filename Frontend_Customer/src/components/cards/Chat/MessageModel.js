import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageModel = ({ message, user }) => {
    const status = message.user === user;
    return (
        <View style={styles.container}>
            <View
                style={
                    status
                        ? styles.message_wrapper
                        : [styles.message_wrapper, { alignItems: "flex-start" }]
                }
            >
                <View style={status ? styles.message : [
                    styles.message, { backgroundColor: "#DFDFDF"}
                ]}>
                <Text style={styles.text}>{message.message}</Text>
                </View>
            </View>
        </View>
    );
};

export default MessageModel;

const styles = StyleSheet.create({
    container:{
    },
    message_wrapper: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 5,
    },
    message:{
        maxWidth: "50%",
        backgroundColor:"#FF7A00",
        padding: 15,
        borderRadius: 10,
        // marginBottom: 2,
    },
    text: {
        fontFamily: "Kanit-Medium",
    }
});
