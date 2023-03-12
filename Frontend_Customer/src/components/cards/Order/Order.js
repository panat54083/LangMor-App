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
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View View style={styles.textContainer}>
                    <Text style={styles.textNameStyle}>
                        {order.restaurant.name}
                    </Text>
                    <View style={styles.textAddressContainer}>
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
                    </View>
                </View>
                <View style={styles.textPriceContainer}>
                    <Text style={styles.textPriceStyle}>
                        {calPrice(order.order.cart)} ฿
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Order;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        paddingVertical: "2%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    textContainer: {
        flex: 0.75,
        marginLeft: "6%",
        justifyContent: "space-around",
    },
    textNameStyle: { fontFamily: "Kanit-Bold", fontSize: 22 },
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
        flex: 0.25,
    },
    textPriceStyle: { fontFamily: "Kanit-Bold", fontSize: 18 },
});
