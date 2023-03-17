import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Fav = (props) => {
    const {
        isFav = false,
        onPress = () => console.log("This is FavBtn"),
        disable = false,
    } = props;
    return (
        <TouchableOpacity
            disabled={disable}
            style={disable ? { opacity: 0.5 } : null}
            onPress={() => {
                onPress();
            }}
        >
            <View style={styles.container}>
                <Ionicons
                    name={isFav ? "heart" : "heart-outline"}
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
