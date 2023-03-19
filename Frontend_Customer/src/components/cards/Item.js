import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const Item = (props) => {
    const { itemData, onPress, type } = props;
    // console.log(itemData);
    return (
        <>
            {type === "second" ? (
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.container}>
                        {itemData.picture ? (
                            <View style={{ marginLeft: "6%" }}>
                                <Image
                                    style={styles.logo}
                                    source={{
                                        uri: `${itemData.picture.url}`,
                                    }}
                                />
                            </View>
                        ) : null}
                        <View
                            View
                            style={[
                                styles.textContainer,
                                itemData.picture
                                    ? { width: "68%" }
                                    : { width: "88%" },
                            ]}
                        >
                            <Text style={styles.textNameStyle}>
                                {itemData.name}
                            </Text>
                            <View style={styles.textPriceContainer}>
                                <FontAwesome5 name="money-bill-alt" size={16} color="#148F12" />
                                {/* <FontAwesome5
                                    name="money-bill-wave"
                                    size={16}
                                    color="#148F12"
                                /> */}
                                <Text style={styles.textPriceStyle}>
                                    {`  ${itemData.price}`} บาท
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.container}>
                        {itemData.picture ? (
                            <View style={{ marginLeft: "6%" }}>
                                <Image
                                    style={styles.logo}
                                    source={{
                                        uri: `${itemData.picture.url}`,
                                    }}
                                />
                            </View>
                        ) : null}
                        <View
                            View
                            style={[
                                styles.textContainer,
                                itemData.picture
                                    ? { width: "68%" }
                                    : { width: "88%" },
                            ]}
                        >
                            <Text style={styles.textNameStyle}>
                                {itemData.name}
                            </Text>
                            <View style={styles.textPriceContainer}>
                                <Text
                                    style={styles.textPriceStyle}
                                    numberOfLines={1}
                                >
                                    <Text
                                        style={{
                                            color: "black",
                                            fontFamily: "Kanit-SemiBold",
                                        }}
                                    >
                                        {itemData.type === "found"
                                            ? "รายละเอียด: "
                                            : "รายละเอียด: "}
                                    </Text>{" "}
                                    {`${itemData.detail}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </>
    );
};

export default Item;

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    container: {
        flexDirection: "row",
        borderWidth: 1,
        paddingVertical: "3%",
        borderRadius: 10,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        backgroundColor: "#FFFFFF",
        width: "100%",
    },
    textContainer: {
        marginLeft: "6%",
        justifyContent: "space-around",
    },
    textNameStyle: { fontFamily: "Kanit-SemiBold", fontSize: 22 },
    textPriceStyle: {
        color: "#9D9693",
        fontFamily: "Kanit-Medium",
        fontSize: 14,
    },
    textPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
        // width: "86%",
        // backgroundColor: "blue",
    },
});
