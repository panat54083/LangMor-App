//Packages
import React from "react";
//Components
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const Small = ({ label, onPress, image, numberOfLines = 1 }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, styles.shadow]}
        >
            <View style={styles.container_image}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.contain_text}>
                <Text
                    style={styles.text}
                    adjustsFontSizeToFit={true}
                    numberOfLines={numberOfLines}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Small;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        flexDirection: "column",
        height: 146,
        width: 154,
        marginBottom: "4%",
    },
    container_image: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    contain_text: {
        // backgroundColor:"red",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    image: {
        resizeMode: "contain",
        flex: 1,
        width: 90,
        // backgroundColor:"red",
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        color: "#1A0700",
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
