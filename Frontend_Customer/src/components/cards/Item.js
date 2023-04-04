import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const Item = (props) => {
    const { itemData, onPress, type } = props;
    const formatTimestamp = (time) => {
        if (time !== null) {
            const date = new Date(time);
            const times = date.toLocaleTimeString("en-US", {
                hour12: true,
                hourCycle: "h12",
            });
            const [hour, minute] = times.split(":").slice(0, 2);
            const formattedTime = `${hour}.${minute}`;
            return formattedTime;
        } else {
            return "";
        }
    };
    const formatDate = (item) => {
        const date = new Date(item);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const output = `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
        }/${year}`;
        return output;
    };
    // console.log(itemData);
    return (
        <>
            {type === "second" ? (
                <TouchableOpacity onPress={() => onPress()}>
                    <View style={styles.container}>
                        {itemData.picture ? (
                            <View
                                style={{
                                    marginLeft: "6%",
                                    backgroundColor: null,
                                    justifyContent: "center",
                                }}
                            >
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
                                <FontAwesome5
                                    name="money-bill-alt"
                                    size={16}
                                    color="#148F12"
                                />
                                <Text style={styles.textPriceStyle}>
                                    {`  ${Number(itemData.price).toLocaleString()}`} บาท
                                </Text>
                            </View>
                            {itemData.closed === true && (
                                <Text
                                    style={[
                                        styles.textPriceStyle,
                                        { color: "#FF0101" },
                                    ]}
                                >
                                    {`ปิดเมื่อ ${formatDate(
                                        itemData.updatedAt
                                    )} ${formatTimestamp(
                                        itemData.updatedAt
                                    )}`}{" "}
                                    น.
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.container}>
                        {itemData.picture ? (
                            <View style={{ marginLeft: "6%" , justifyContent: "center"}}>
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
                            {itemData.closed === true && (
                                <Text
                                    style={[
                                        styles.textPriceStyle,
                                        { color: "#FF0101" },
                                    ]}
                                >
                                    {`ปิดเมื่อ ${formatDate(
                                        itemData.updatedAt
                                    )} ${formatTimestamp(
                                        itemData.updatedAt
                                    )}`}{" "}
                                    น.
                                </Text>
                            )}
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
