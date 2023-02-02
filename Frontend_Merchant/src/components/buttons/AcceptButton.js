import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const AcceptButton = ({ label, onPress }) => {
    return (
        <Pressable onPress={onPress} style={[styles.button, styles.shadow]}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
};

export default AcceptButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF7A00",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 100,
    },
    text: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 20,
        color: "white",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
