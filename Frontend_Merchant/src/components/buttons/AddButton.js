// Packages
import React from "react";
// Components
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, styles.shadow]}
        >
            <View>
                <FontAwesome5 name="plus" size={50} color="#FF7A00" />
            </View>
        </TouchableOpacity>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
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
