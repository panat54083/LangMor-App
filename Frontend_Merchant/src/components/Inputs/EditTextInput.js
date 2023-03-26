import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const EditTextInput = ({
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
    multiline = false,
    numberOfLines = 1,
    style = null,
    editable= true,
}) => {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={"top"}
                editable={editable}
            />
            {/* {value ? (
                <Feather name="edit" size={24} color="#C9C5C4" />
            ) : (
                <Feather name="edit" size={24} color="red" />
            )} */}
        </View>
    );
};

export default EditTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 14,
        marginBottom: 4,
    },
    input: {
        // paddingLeft: 10,
        width: "100%",
        fontFamily: "Kanit-Medium",
        fontSize: 16,
    },
});
