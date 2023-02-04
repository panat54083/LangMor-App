import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CardRestaurantTag = (props) => {
    const {tagName ,imgSrc} = props
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{tagName}</Text>

            <View style={styles.imgContainer}>
                <Image
                    source={imgSrc}
                    style={styles.imgStyles}
                />
            </View>
        </View>
    );
};

export default CardRestaurantTag;

const styles = StyleSheet.create({
    container: {
        width: 141,
        height: 53,
        marginLeft:6,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#171717",
        marginBottom:20,
    },
    textStyle: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        color: "#FF4200",
    },
    imgContainer: {
        width: "35%",
        marginTop: "5%",
    },
    imgStyles: { width: "100%", height: 50, aspectRatio: 1 },
});
