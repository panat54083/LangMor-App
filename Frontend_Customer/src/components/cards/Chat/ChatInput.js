//Packages
import React from "react";
//Components
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const ChatInput = ({forwardedRef, onChangeText, sendOnPress, cameraOnPress, pictureOnPress}) => {
    return (
        <View style={styles.main_container}>
            <TouchableOpacity style={styles.image_input} onPress={pictureOnPress}>
                <FontAwesome name="file-picture-o" size={20} color="#FF4200" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.image_input} onPress={cameraOnPress}>
                <FontAwesome name="camera" size={20} color="#FF4200" />
            </TouchableOpacity>
            <View style={styles.input_container}>
                <TextInput
                    style={[styles.font, styles.input_style]}
                    placeholder="พิมพ์ที่นี่..."
                    ref={forwardedRef}
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity style={styles.send_container} onPress={sendOnPress}>
                <Ionicons name="send" size={30} color="#FF4200" />
            </TouchableOpacity>
        </View>
    );
};

export default ChatInput;

const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        alignItems: "center",
        // flex: 1,
        backgroundColor: "white",
        height: 50,
    },
    input_container: {
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#DFDFDF",
        flex: 7,
        marginHorizontal: 10,
    },
    send_container: {
        flex: 1,
    },
    input_style: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    font: {
        fontFamily: "Kanit-Medium",
        fontSize: 12,
    },
    image_input: {
        marginLeft: 10,
    },
});
