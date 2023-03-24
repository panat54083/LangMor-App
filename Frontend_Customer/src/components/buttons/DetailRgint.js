import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const DetailRgint = ({ onPress, color = "black" }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={[styles.font, { color: color }]}>ดูรายละเอียด</Text>
        </Pressable>
    );
};

export default DetailRgint;

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
