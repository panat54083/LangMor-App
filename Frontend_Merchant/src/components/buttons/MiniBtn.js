import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const MiniBtn = ({ label, color="#FF7A00", onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

export default MiniBtn;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 14,
        color: "white",
    },
});
