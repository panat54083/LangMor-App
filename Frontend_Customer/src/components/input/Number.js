import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Number = ({ number, setNumber, minNumber = 0, maxNumber = 99 }) => {
    const minus = () => {
        if (number > minNumber) {
            setNumber(number - 1);
        }
    };

    const plus = () => {
        if (number <= maxNumber) {
            setNumber(number + 1);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={minus}
                style={[styles.button, styles.minus]}
            >
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <View style={[styles.button, {width:70}]}>
                <Text style={styles.text}>{number}</Text>
            </View>
            <TouchableOpacity
                onPress={plus}
                style={[styles.button, styles.plus]}
            >
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Number;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        height: 50,
    },
    button: {
        height: 50,
        width: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#9D9693",
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    minus: {
        borderWidth: 2,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    plus: {
        borderWidth: 2,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    text: {
        fontFamily: "Kanit-Medium",
        fontSize: 20,
        color: "#FF4200",
    },
});