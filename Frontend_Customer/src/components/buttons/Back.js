import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Back = (props) => {
    const { handlerOnPressBack, reverseColor } = props;
    return (
        <TouchableOpacity
            style={
                reverseColor
                    ? styles.orangeBgContainer
                    : styles.whiteBgContainer
            }
            onPress={handlerOnPressBack}
        >
            <Ionicons
                name="chevron-back"
                size={30}
                color={reverseColor ? "white" : "#FF7A00"}
            />
        </TouchableOpacity>
    );
};

export default Back;

const styles = StyleSheet.create({
    whiteBgContainer: {
        width: 45,
        height: 45,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    orangeBgContainer: {
        width: 45,
        height: 45,
        backgroundColor: "#FF7A00",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});
