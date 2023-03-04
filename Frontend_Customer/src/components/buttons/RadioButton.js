import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const RadioButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.radioButtonContainer}>
                <View style={styles.radioButtonCircle}>
                    {props.selected ? (
                        <View style={styles.selectedRadioButton} />
                    ) : null}
                </View>
                <Text style={styles.radioButtonLabel}>{props.label}</Text>
                {props.price ? (
                    <Text
                        style={[
                            styles.radioButtonLabel,
                            { marginLeft: "auto", marginRight: "12.33%" },
                        ]}
                    >
                        {props.price} ฿
                    </Text>
                ) : (
                    ""
                )}
            </View>
        </TouchableOpacity>
    );
};

export default RadioButton;

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFE8E0",
        height: 40,
        marginBottom: 6,
        borderRadius: 20,
    },
    radioButtonCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ACACAC",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "3.33%",
        marginRight: "4%",
        backgroundColor: "white",
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
