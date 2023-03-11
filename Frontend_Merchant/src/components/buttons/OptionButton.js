import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from "react-native";

const OptionButton = ({ label, onPress, font_color="#555555" }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={[styles.font_label,{color: font_color}]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default OptionButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: "#DFDFDF",
    },
    font_label: {
        marginLeft: "4%",
        fontFamily: "Kanit-Medium",
        fontSize: 18,
    },
});
