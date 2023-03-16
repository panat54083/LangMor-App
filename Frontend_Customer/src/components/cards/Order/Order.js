import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Order = (props) => {
    const { order, onPress } = props;
    // console.log(order.order.cart);
    const calPrice = (cart) => {
        let price = 0;
        cart.forEach((item) => {
            price = price + item.price * item.amount;
        });
        return price;
    };
    const changeTimeFormat = (timestamp) => {
        let date = new Date(timestamp);
        let newDate = {
            hour: date.getHours().toString().padStart(2, "0"),
            mins: date.getMinutes().toString().padStart(2, "0"),
        };
        return `${newDate.hour}:${newDate.mins}`;
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
    const timestamp = changeTimeFormat(order.order.createdAt);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, styles.shadow]}
        >
            <View View style={styles.textContainer}>
                <Text style={styles.textNameStyle}>
                    {order.restaurant.name}
                </Text>
                {/* <View style={styles.textAddressContainer}>
                    <Text style={styles.textAddressStyle} numberOfLines={1}>
                            <Text
                                style={{
                                    color: "black",
                                    fontFamily: "Kanit-Bold",
                                }}
                            >
                                จัดส่งที่:{" "}
                            </Text>
                            {order.order.address}
                        </Text>
                </View> */}
            </View>
            <View style={styles.textPriceContainer}>
                <Text style={styles.textPriceStyle}>
                    เวลา{" "}
                    <Text style={{ color: "#FF4200" }}>
                        {/* {calPrice(order.order.cart)} */}
                        {timestamp}
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Order;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // borderWidth: 1,
        paddingVertical: "5%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderColor: "#ddd",
    },
    textContainer: {
        flex: 0.50,
        marginLeft: "6%",
        justifyContent: "space-around",
    },
    textNameStyle: { fontFamily: "Kanit-SemiBold", fontSize: 22 },
    textAddressStyle: {
        color: "#9D9693",
        fontFamily: "Kanit-Medium",
        fontSize: 14,
    },
    textAddressContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textPriceContainer: {
        alignSelf: "center",
        flex: 0.50,
        alignItems: "flex-end",
        marginRight: "4%"
    },
    textPriceStyle: { fontFamily: "Kanit-Bold", fontSize: 18 },
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
