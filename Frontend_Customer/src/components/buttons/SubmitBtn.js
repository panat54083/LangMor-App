import React from "react";
//conponent
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SubmitBtn = ({ label, onPress, disable }) => {
    return (
        <TouchableOpacity
            disabled={disable}
            onPress={onPress}
            style={[
                styles.button,
                styles.shadow,
                disable ? { opacity: 0.5 } : null,
            ]}
        >
            <Text style={[styles.text]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default SubmitBtn;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF7A00",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 100,
        alignItems: "center",
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
