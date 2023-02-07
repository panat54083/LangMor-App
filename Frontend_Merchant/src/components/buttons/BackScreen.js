import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const BackScreen = ({ onPress, color="white" }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <MaterialIcons name="arrow-back-ios" size={24} color={color} />
        </Pressable>
    );
};

export default BackScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
});
