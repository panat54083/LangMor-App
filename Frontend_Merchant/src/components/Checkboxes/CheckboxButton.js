import React, { useState, useRef, useEffect } from "react";
//components
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
} from "react-native";

const CheckboxButton = ({ label, checked, onPress }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (checked) {
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [checked]);

    const innerSquareStyle = {
        transform: [{ scale: scaleValue }],
    };

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container]}>
            <View style={styles.check_container}>
                <View style={[styles.unChecked, checked && styles.checked]}>
                    {checked && (
                        <Animated.View
                            style={[styles.innerSquare, innerSquareStyle]}
                        />
                    )}
                </View>
            </View>
            <View style={styles.text_container}>
                <Text style={styles.text}> {label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CheckboxButton;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        margin: 4,
    },
    check_container: {
        marginHorizontal: 10,
    },
    text_container: {},
    text: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 14,
        color: "#9D9693",
    },
    unChecked: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#FF4200",
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        backgroundColor: "white",
    },
    innerSquare: {
        width: 12,
        height: 12,
        backgroundColor: "#ff7a00",
    },
});
