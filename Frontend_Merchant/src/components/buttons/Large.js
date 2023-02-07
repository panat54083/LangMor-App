//Components
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Pressable,
} from "react-native";
//Packages
import React from "react";

const Large = ({ label, image, onPress, numberOfLines=2}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, styles.shadow]}
        >
            <View style={styles.container_text}>
                <Text
                    style={styles.text}
                    adjustsFontSizeToFit={true}
                    numberOfLines={numberOfLines}
                >
                    {label}
                </Text>
            </View>
            <View style={styles.container_image}>
                <Image source={image} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

export default Large;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingLeft: 16,
        borderRadius: 15,
        marginRight: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 146,
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
    image: {
        width: 115,
        flex: 1,
        resizeMode:"contain",
        marginTop: 36, 
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 38,
        color: "#1A0700",
    },
    container_text: {
        alignItems: "flex-start",
        flex: 2,
        justifyContent: "center",
    },
    container_image: {
        flex: 1,
        justifyContent: "flex-end",
    },
});
