import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const BtnToFeature = (props) => {
    const { name, imgSrc, navigateToFeature } = props;

    return (
            <TouchableOpacity style={[styles.container, styles.shadow]} onPress={navigateToFeature}>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.text}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                </View>
                <View style={styles.picContainer}>
                    <Image source={imgSrc} style={{ width: 80, height: 80 }} />
                </View>
            </TouchableOpacity>
    );
};

export default BtnToFeature;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        // borderWidth: 1,
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
        textAlign: "center",
        fontSize: 38,
    },
    textContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: "3%",
    },
    picContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
