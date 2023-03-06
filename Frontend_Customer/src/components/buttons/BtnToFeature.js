import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const BtnToFeature = (props) => {
    const { name, imgSrc, navigateToFeature } = props;

    return (
        <TouchableOpacity onPress={navigateToFeature}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.picContainer}>
                    <Image source={imgSrc} style={{ width: 80, height: 80 }} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BtnToFeature;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        width: "80%",
        height: 130,
        alignSelf: "center",
        marginBottom: 13,
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 38,
    },
    textContainer: { flex: 2, justifyContent: "center", alignItems: "center" },
    picContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
