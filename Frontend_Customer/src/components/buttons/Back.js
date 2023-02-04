import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Back = (props) => {
    const { onPressBack } = props;
    return (
        <TouchableOpacity
            style={styles.container}
        >
            <Ionicons name="chevron-back" size={30} color="#FF7A00" />
        </TouchableOpacity>
    );
};

export default Back;

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 45,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});
