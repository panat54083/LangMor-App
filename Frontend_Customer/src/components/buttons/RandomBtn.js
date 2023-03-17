import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const RandomBtn = ({ onPress, style, color = "black" }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, styles.shadow, style]}
        >
            <FontAwesome5 name="dice" size={24} color={color} />
        </TouchableOpacity>
    );
};

export default RandomBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
});
