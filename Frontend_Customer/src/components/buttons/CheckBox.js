import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Checkbox = (props) => {
    const { checked, onPress, label, price, disable } = props;
    return (
        <TouchableOpacity
            style={[
                styles.checkboxContainer,
                disable ? { opacity: 0.5 } : null,
            ]}
            onPress={onPress}
            disabled={disable}
        >
            <View style={styles.checkbox}>
                {checked ? <View style={styles.checkedCheckbox} /> : null}
            </View>
            <Text style={styles.checkboxLabel}>{label}</Text>
            <Text
                style={[
                    styles.checkboxLabel,
                    { marginLeft: "auto", marginRight: "12.33%" },
                ]}
            >
                {price} ฿
            </Text>
        </TouchableOpacity>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFE8E0",
        height: 40,
        marginBottom: 6,
        borderRadius: 20,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: "#ACACAC",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "3.33%",
        marginRight: "4%",
        backgroundColor: "white",
    },
    checkedCheckbox: {
        height: 10,
        width: 10,
        backgroundColor: "#000000",
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: "Kanit-SemiBold",
    },
});
