import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Searchbar = (props) => {
    const { height = 50, onSearchBoxChange, searchText, style} = props;

    return (
        <View
            style={[
                styles.inputContainer,
                { height: Number(height)},
                styles.shadow,
                style,
            ]}
        >
            <Ionicons name="search" size={20} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="ค้นหา..."
                onChangeText={(text) => onSearchBoxChange(text)}
                value={searchText}
            />
        </View>
    );
};

export default Searchbar;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        paddingLeft: 15,
        width: "90%"
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Kanit-Medium",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
});
