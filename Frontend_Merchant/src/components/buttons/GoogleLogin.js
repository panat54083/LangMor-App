import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const GoogleLogin = ({ onPress, onPressIn, onPressOut, isPressed }) => {
    return (
        <TouchableOpacity
            // onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                styles.container,
                styles.shadow,
                isPressed ? { opacity: 0.2 } : null,
            ]}
        >
            <Image
                source={require("../../assets/icons/google.png")}
                style={styles.image}
            />
            <Text style={styles.text}>GOOGLE</Text>
        </TouchableOpacity>
    );
};

export default GoogleLogin;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 15,
        // marginBottom: 30,
        flexDirection: "row",
        justifyContent: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 30,
        height: 30,
        position: "absolute",
        left: 10,
        top: "30%",
    },
    text: {
        fontFamily: "Kanit-Medium",
        fontSize: 16,
        color: "#1A0700",
    },
});
