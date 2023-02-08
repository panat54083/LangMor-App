import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const RadioButton = (props) => {
    return (
        <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={props.onPress}
        >
            <View style={styles.radioButtonCircle}>
                {props.selected ? (
                    <View style={styles.selectedRadioButton} />
                ) : null}
            </View>
            <Text style={styles.radioButtonLabel}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default RadioButton;

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
    },
    radioButtonCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ACACAC",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedRadioButton: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "black",
    },
    radioButtonLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
});
