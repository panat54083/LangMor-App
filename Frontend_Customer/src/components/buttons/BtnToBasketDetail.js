import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const BtnToBasketDetail = (props) => {
    const { amount, price } = props;
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.textStyle}>{amount}</Text>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
                <Text style={styles.textStyle}>ดูของในตะกร้า</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.textStyle}>{price} B.</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BtnToBasketDetail;

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        fontFamily: "Kanit-Bold",
        color: "#FFFFFF",
    },
    container: {
        backgroundColor: "#FF7A00",
        flexDirection: "row",
        height: 46,
        alignItems: "center",
        borderRadius: 10,
    },
});
