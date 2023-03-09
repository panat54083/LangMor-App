import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const SecondHand = (props) => {
    const { secondHandData, onPress } = props;
    // console.log(secondHandData);
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                {secondHandData.picture ? (
                    <View style={{ marginLeft: "6%" }}>
                        <Image
                            style={styles.logo}
                            source={{
                                uri: `${secondHandData.picture.url}`,
                            }}
                        />
                    </View>
                ) : null}
                <View View style={styles.textContainer}>
                    <Text style={styles.textNameStyle}>
                        {secondHandData.name}
                    </Text>
                    <View style={styles.textPriceContainer}>
                        <FontAwesome5
                            name="money-bill-wave"
                            size={16}
                            color="green"
                        />
                        <Text style={styles.textPriceStyle}>
                            {`  ${secondHandData.price}`} บาท
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SecondHand;

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    container: {
        flexDirection: "row",
        borderWidth: 1,
        paddingVertical: "2%",
        borderRadius: 10,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    textContainer: { marginLeft: "6%", justifyContent: "space-around" },
    textNameStyle: { fontFamily: "Kanit-Bold", fontSize: 22 },
    textPriceStyle: {
        color: "#9D9693",
        fontFamily: "Kanit-Medium",
        fontSize: 14,
    },
    textPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
