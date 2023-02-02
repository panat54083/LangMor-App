import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const CustomTextInput = ({ placeholder }) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder={placeholder} style={styles.input} />
            <Feather name="edit" size={24} color="#C9C5C4" />
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderRadius: 15,
        marginBottom: 4,
    },
    input: {
        paddingLeft: 10,
        width: 250,
        fontFamily: "Kanit-Medium",
        fontSize: 16,
    },
});
