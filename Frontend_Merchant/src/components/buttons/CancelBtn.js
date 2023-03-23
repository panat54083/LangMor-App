// Packages
import React from "react";
// Components
import { StyleSheet, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CancelBtn = ({ onPress, color = "#FF0101" }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={[styles.font, { color: color }]}>ยกเลิกออเดอร์</Text>
            {/* <MaterialCommunityIcons name="cancel" size={24} color={color} /> */}
        </Pressable>
    );
};

export default CancelBtn;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    font: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 16,
    },
});
