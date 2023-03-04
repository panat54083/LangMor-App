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

const RadioButton = (props) => {
    const {
        onPress,
        selected,
        price = null,
        label,
        fontFamily = "Kanit-SemiBold",
        backgroundColor = "#FFE8E0",
    } = props;
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (selected) {
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
    }, [selected]);

    const innerCircleStyle = {
        transform: [{ scale: scaleValue }],
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    styles.radioButtonContainer,
                    { backgroundColor: backgroundColor },
                ]}
            >
                <View style={styles.radioButtonCircle}>
                    {selected ? (
                        <Animated.View
                            style={[
                                styles.selectedRadioButton,
                                innerCircleStyle,
                            ]}
                        />
                    ) : null}
                </View>
                <Text
                    style={[
                        styles.radioButtonLabel,
                        { fontFamily: fontFamily },
                    ]}
                >
                    {label}
                </Text>
                {price ? (
                    <Text
                        style={[
                            styles.radioButtonLabel,
                            { marginLeft: "auto", marginRight: "12.33%" },
                        ]}
                    >
                        {price} ฿
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
        height: 12,
        width: 12,
        borderRadius: 10,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    radioButtonLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
});
