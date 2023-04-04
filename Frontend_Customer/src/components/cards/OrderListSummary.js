import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import BasketContext from "../../hooks/context/BasketContext";
const OrderListSummary = (props) => {
    const { basketDetail } = useContext(BasketContext);
    const { allprice, handleOnPressEdit, onPressAddFoods } = props;

    return (
        <View style={styles.container}>
            <View style={styles.groupHeader}>
                <View>
                    <Text style={styles.textSummary}>สรุปรายการคำสั่งซื้อ</Text>
                </View>
                <TouchableOpacity
                    style={[styles.addItemBtn]}
                    onPress={onPressAddFoods}
                >
                    <Text
                        style={[
                            styles.btnText,
                            {
                                textDecorationLine: "underline",
                                color: "#FF7A00",
                            },
                        ]}
                    >
                        สั่งอาหารเพิ่ม
                    </Text>
                </TouchableOpacity>
            </View>
            {basketDetail.foods.map((order) => {
                return (
                    <View key={order.id} style={styles.contentContainer}>
                        <View style={styles.amountView}>
                            <Text style={styles.amountText}>
                                {order.amount}
                            </Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View>
                                <Text style={styles.foodName}>
                                    {order.food.name}
                                </Text>
                            </View>
                            <View>
                                {order.options.map((option) => {
                                    if (option.value) {
                                        if (option.value.length !== 0) {
                                            if (Array.isArray(option.value)) {
                                                return (
                                                    <Text
                                                        key={option.name}
                                                        style={
                                                            styles.optionText
                                                        }
                                                    >
                                                        {option.name}:{" "}
                                                        {option.value.toString()}
                                                    </Text>
                                                );
                                            } else {
                                                return (
                                                    <Text
                                                        key={option.name}
                                                        style={
                                                            styles.optionText
                                                        }
                                                    >
                                                        {option.name}:{" "}
                                                        {option.value}
                                                    </Text>
                                                );
                                            }
                                        }
                                    }
                                })}
                            </View>
                            <View>
                                {order.moreDetail ? (
                                    <Text style={styles.optionText}>
                                        {order.moreDetail}
                                    </Text>
                                ) : null}
                            </View>
                            <TouchableOpacity
                                style={styles.editOpa}
                                onPress={() => handleOnPressEdit(order)}
                            >
                                <Text style={styles.editText}>Edit </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.priceView}>
                            <Text style={styles.priceText} adjustsFontSizeToFit={true} numberOfLines={1}>
                                {Number(order.price * order.amount).toLocaleString()} B.
                            </Text>
                        </View>
                    </View>
                );
            })}
            <View style={styles.summaryContainer}>
                <View style={{ marginLeft: "5.1%" }}>
                    <Text style={styles.summaryAllAmountText}>ทั้งหมด</Text>
                </View>
                <View style={{ marginLeft: "auto", marginRight: "3.5%" }}>
                    <Text style={styles.summaryAllPriceText}>
                        {Number(allprice).toLocaleString()} บาท
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default OrderListSummary;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    container: {
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
    },
    groupHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    textSummary: {
        fontSize: 18,
        fontFamily: "Kanit-Bold",
        marginLeft: "5.1%",
    },
    addItemBtn: {
        marginLeft: "auto",
        marginRight: "2.3%",
        padding: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
    },
    contentContainer: {
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        marginTop: 6,
    },
    amountView: {
        flex: 0.5,
        alignItems: "center",
    },
    amountText: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
    },
    foodName: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
    },
    optionText: {
        fontSize: 14,
        fontFamily: "Kanit-Medium",
        opacity: 0.3,
    },
    editOpa: { alignSelf: "flex-start" },
    editText: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
        color: "#C9C5C4",
    },
    priceView: {
        flex: 0.5,
        alignItems: "center",
    },
    priceText: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
        color: "#9D9693",
    },
    summaryContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    summaryAllAmountText: {
        fontSize: 18,
        fontFamily: "Kanit-Bold",
        marginLeft: "5.1%",
    },
    summaryAllPriceText: {
        fontSize: 18,
        fontFamily: "Kanit-Medium",
        color: "#9D9693",
    },
});
