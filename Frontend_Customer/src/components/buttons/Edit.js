import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Edit = ({ onPress, color = "black" }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={[styles.font, { color: color }]}>แก้ไข</Text>
        </Pressable>
    );
};

export default Edit;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
        font: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 16,
    },
});

