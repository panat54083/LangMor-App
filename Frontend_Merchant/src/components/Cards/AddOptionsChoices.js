//Packages
import React from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import Choices from "../Inputs/Choices";

const AddOptionsChoices = () => {
    return (
        <View style={styles.container}>
            <Choices placeholder={"ชื่อตัวเลือก"}/>
        </View>
    );
};

export default AddOptionsChoices;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        // flex: 1,
        // backgroundColor: "red",
    },
});
