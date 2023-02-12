import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const BackScreen = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                // backgroundColor: "red",
                paddingVertical: 10,
                paddingHorizontal: 12,
            }}
        >
            <MaterialIcons name="arrow-back-ios" size={24} color="#FF7A00" />
        </TouchableOpacity>
    );
};

export default BackScreen;

const styles = StyleSheet.create({});
