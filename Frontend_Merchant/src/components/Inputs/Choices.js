//Packages
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
//Components
import { StyleSheet, Text, View, TextInput } from "react-native";

const Choices = ({ value, onChangeText, placeholder = null }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.first}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                />
            </View>
            <View style={styles.second}>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            <View style={styles.thrid}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder="ราคา (บาท)"
                    keyboardType="numeric"
                />
            </View>
        </View>
    );
};

export default Choices;

const styles = StyleSheet.create({
    container: {
        // borderRadius: 15,
        marginBottom: 4,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 15,
    },
    input: {
        fontFamily: "Kanit-Medium",
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    first: {
        flex: 2,
    },
    second: {
        backgroundColor: "blue",
        flex: 1,
    },
    thrid: {
        flex: 1,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
});
