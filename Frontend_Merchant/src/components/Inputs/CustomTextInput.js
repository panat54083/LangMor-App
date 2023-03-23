import { StyleSheet, View, TextInput, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const CustomTextInput = ({
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
    multiline = false,
    numberOfLines = 1,
    style = null,
    required = false,
    maxLength = 300,
    header = true,
}) => {
    /*
    keyboardType:   default
                    number-pad
                    decimal-pad
                    numeric
                    email-address
                    phone-pad
                    url 
    */
    return (
        <View style={{ width: "100%" }}>
            {header && (
                <Text
                    style={[
                        styles.font,
                        { fontSize: 18, fontFamily: "Kanit-Bold" },
                    ]}
                >
                    {placeholder}
                    {required ? <Text style={{ color: "red" }}>*</Text> : null}
                </Text>
            )}
            <View style={[styles.container, style]}>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    style={[styles.input, styles.font]}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={"top"}
                    maxLength={maxLength}
                />
            </View>
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderRadius: 15,
        marginBottom: 4,
    },
    input: {
        paddingLeft: 10,
        width: 250,
    },
    font: {
        fontFamily: "Kanit-Medium",
        fontSize: 16,
    },
});
