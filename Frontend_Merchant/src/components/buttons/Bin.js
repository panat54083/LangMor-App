import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Bin = ({ onPress, color = "black" }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Ionicons name="trash-bin" size={24} color={color} />
        </Pressable>
    );
};

export default Bin;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
});
