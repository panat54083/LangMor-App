import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const GoogleLogin = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, styles.shadow]}
        >
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Image
                    source={require("../../assets/icons/google.png")}
                    style={styles.image}
                />
                <View
                    style={{
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <Text style={styles.text}>GOOGLE</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default GoogleLogin;

const styles = StyleSheet.create({
    container : {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 15,
        marginBottom: 30,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: { width: 30, height: 30, marginRight: 10 },
    text: {
        fontFamily: "Kanit-Medium",
        fontSize: 16,
        color: "#1A0700",
    },
});
