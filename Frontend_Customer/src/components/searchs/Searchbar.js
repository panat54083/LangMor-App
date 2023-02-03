import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Searchbar = () => {
    const [text, setText] = useState("");

    return (
        <View style={styles.inputContainer}>
            <Ionicons name="search" size={20} style={styles.icon}/>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={(text) => setText(text)}
                value={text}
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
        borderRadius: 25,
        padding: 15,
        margin: 10,
        width:'80%',
        height:55
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex:1,
        fontSize: 16
      },
});
