import React from "react";
//conponent
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from "react-native";

const AcceptButton = ({ label, onPress ,backgroundColor="#FF7A00"}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, styles.shadow, {backgroundColor: backgroundColor}]}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

export default AcceptButton;

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
