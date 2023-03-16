import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Fav = (props) => {
    const { fav = false } = props;
    return (
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.container}>
                <Ionicons
                    name={fav ? "heart" : "heart-outline"}
                    size={27}
                    color="#FF7A00"
                />
            </View>
        </TouchableOpacity>
    );
};

export default Fav;

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
});
