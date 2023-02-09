//Packages
import React, { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
//Components
import { StyleSheet, Text, View, TextInput, Modal } from "react-native";
import Dropdown from "./Dropdown";

const Choices = ({ value, onChangeText, }) => {
    const [priceOption, setPriceOption] = useState("increase")

    return (
        <View style={[styles.container, 
        // styles.shadow
        ]}>
            <View style={styles.first}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder="ชื่อตัวเลือก"
                />
            </View>
            <View style={styles.second}>
                <Dropdown setSelectValue={setPriceOption}/>
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
        flex:1,
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
        // backgroundColor: "red",
    },
    second: {
        // backgroundColor: "blue",
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
