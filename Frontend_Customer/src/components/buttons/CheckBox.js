//Packages
import React, { useEffect, useRef } from "react";
//Components
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from "react-native";

const Checkbox = (props) => {
    const {
        onPress,
        checked,
        label,
        price,
        fontFamily = "Kanit-SemiBold",
        backgroundColor = "#FFE8E0",
        disable = false,
    } = props;
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
        <TouchableOpacity
            style={[
                styles.checkboxContainer,
                { backgroundColor: backgroundColor },
                disable ? { backgroundColor: "#F3F3F3", opacity: 0.5} : null,
            ]}
            onPress={onPress}
            disabled={disable}
        >
            <View style={styles.checkbox}>
                {checked ? (
                    <Animated.View
                        style={[styles.checkedCheckbox, innerSquareStyle]}
                    />
                ) : null}
            </View>
            <Text style={[styles.checkboxLabel, { fontFamily: fontFamily }]}>
                {label}
            </Text>
            {price ? (
                <Text
                    style={[
                        styles.checkboxLabel,
                        { marginLeft: "auto", marginRight: "12.33%" },
                    ]}
                >
                    {price} ฿
                </Text>
            ) : (
                ""
            )}
        </TouchableOpacity>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
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
        height: 12,
        width: 12,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: "Kanit-SemiBold"
    },
});
