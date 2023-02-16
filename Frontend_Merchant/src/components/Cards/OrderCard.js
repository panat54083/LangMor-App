//Packages
import React from "react";
//Components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const OrderCard = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.id]}>
                <View style={styles.box_id}>
                    <Text style={[styles.font_id]}>
                        ID 
                    </Text>
                        <Text style={[styles.font_id,{ color: "white" }]}>0001</Text>
                </View>
            </View>
            <View style={[styles.name, { justifyContent: "space-around" }]}>
                <Text style={styles.font_name}>ปณัฎฐ์</Text>
                <View style={{ flexDirection: "row" }}>
                    <Entypo name="back-in-time" size={24} color="#FF4200" />
                    <Text
                        style={[
                            styles.font_name,
                            { color: "#FF4200", marginLeft: 4 },
                        ]}
                    >
                        รับภายใน 10 นาที
                    </Text>
                </View>
            </View>
            <View style={styles.price}>
                <Text style={styles.font_price}>120</Text>
            </View>
        </TouchableOpacity>
    );
};

export default OrderCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 15,
    },
    id: {
        flex: 1,
        margin: 10,
    },
    box_id: {
        backgroundColor: "#FF7A00",
        borderRadius: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    font_id: {
        fontFamily: "Kanit-Bold",
        fontSize: 25,
        paddingHorizontal: 5,
    },
    name: {
        flex: 2,
        // paddingTop: 5,
    },
    font_name: {
        fontFamily: "Kanit-Bold",
        fontSize: 19,
    },
    font_price: {
        fontFamily: "Kanit-Bold",
        fontSize: 19,
    },
    price: {
        flex: 1,
        paddingTop: 5,
        alignItems: "flex-end",
        right: 10,
    },
});
