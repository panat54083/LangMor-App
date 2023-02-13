//Packages
import React, { useState, useRef, useEffect } from "react";
//Components
import { StyleSheet, Text, View, TextInput, Modal } from "react-native";
import Dropdown from "./Dropdown";

const Choices = ({ name, price, setName, setPrice, setMethod }) => {
    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={[styles.first]}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="ตัวเลือก"
                />
            </View>
            <View style={[styles.second]}>
                <Dropdown getValue={setMethod} />
            </View>
            <View style={styles.third}>
                <TextInput
                    style={styles.input}
                    onChangeText={(price) => setPrice(Number(price))}
                    value={price}
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
        flex: 1,
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
        // backgroundColor: "blue"k
        borderLeftWidth: 0.4,
        borderRightWidth: 0.4,
        borderColor: "gray",
        flex: 1,
    },
    third: {
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

        elevation: 2,
    },
});
