//Packages
import React from "react";
import { Entypo } from "@expo/vector-icons";

//Components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// define "lord-icon" custom element with default properties

const StateBtn = ({ label1, label2, status, onPress }) => {
    return (
        <View style={[{ width: "30%" }]}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.container, styles.shadow]}
            >
                <View style={{ flex: 3, justifyContent:"center", alignItems:"center" }}>
                        <Text
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                         style={styles.font}>{status ? label1 : label2}</Text>
                </View>
                <View style={{ flex: 1 , }}>
                    <Entypo name="cycle" size={24} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default StateBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF4200",
        borderRadius: 40,
        alignItems: "center",
        flexDirection: "row",
        padding: 8,
        // justifyContent:"center",
        // alignSelf: "center"
    },
    font: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 16,
        color:"white"
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
