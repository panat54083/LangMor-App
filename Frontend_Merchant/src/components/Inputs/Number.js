import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const Number = ({ getNumber, minNumber = 0, maxNumber = 99 }) => {
    const [digit , setDigit] = useState(1)
    const minus = () => {
        if (digit> minNumber) {
            setDigit(digit - 1);
        }
    };

    const plus = () => {
        if (digit <= maxNumber) {
            setDigit(digit + 1);
        }
    };
    useEffect(()=>{
        getNumber(digit)
    },[digit])
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={minus}
                style={[styles.button, styles.minus]}
            >
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <View style={[styles.button, {width:70}]}>
                <Text style={styles.text}>{digit}</Text>
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
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    plus: {
        borderWidth: 2,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    text: {
        fontFamily: "Kanit-Medium",
        fontSize: 20,
        color: "#FF4200",
    },
});
