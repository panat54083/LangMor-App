import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const CustomTextInput = ({
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
    multiline = false,
    numberOfLines= 1,
    style = null
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
        <View style={[styles.container, style]}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={'top'}
            />
            {value ? (
                <Feather name="edit" size={24} color="#C9C5C4" />
            ):
            (
                <Feather name="edit" size={24} color="red" />
            )
            }
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
        fontFamily: "Kanit-Medium",
        fontSize: 16,

    },
});
