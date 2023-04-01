//Packages
import React from "react";
//Components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CardTwoSide = ({ label, numberOfContact, onPressLeft, onPressRight }) => {
    return (
        <View style={[styles.container, styles.shadow]}>
            <TouchableOpacity
                style={[
                    styles.botton,
                    { borderRightWidth: 0.5, borderColor: "#E5E5E5" },
                ]}
                onPress={onPressLeft}
            >
                <Text style={[styles.font, { fontSize: 20 ,}]}>{label}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.botton,
                    { borderLeftWidth: 0.5, borderColor: "#E5E5E5" },
                ]}
                onPress={onPressRight}
            >
                <Text style={styles.font}>จำนวนคนติดต่อ</Text>
                <Text style={styles.font}>
                    <Text style={{ color: "#FF4200" }}>{numberOfContact}</Text>{" "}
                    คน
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CardTwoSide;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 4,
        borderRadius: 10,
    },
    botton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 10,
    },
    font: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 16,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});
