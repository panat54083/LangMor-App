//Packages
import React, { useEffect, useState } from "react";
//Components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const OrderCard = ({ onPress, name, time, order_number}) => {
    const [timestamp, setTimestamp] = useState("");
    useEffect(() => {
        formatTimestamp(time);
    }, []);
    const formatTimestamp = (time) => {
        if (time !== null) {
            const date = new Date(time);
            const times = date.toLocaleTimeString("en-US", {
                hour12: true,
                hourCycle: "h12",
            });
            const [hour, minute] = times.split(':').slice(0, 2);
            const formattedTime = `${hour}.${minute}`;
            setTimestamp(formattedTime);
        } else {
            setTimestamp("");
        }
    };
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.id]}>
                <View style={styles.box_id}>
                    <Text style={[styles.font_id]}>ลำดับ</Text>
                    <Text style={[styles.font_id, { color: "white" }]}>
                        {order_number}
                    </Text>
                </View>
            </View>
            <View style={[styles.name, { justifyContent: "space-around" }]}>
                <Text style={styles.font_name}>{name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Entypo name="back-in-time" size={24} color="#FF4200" />
                    <Text
                        style={[
                            styles.font_name,
                            { color: "#FF4200", marginLeft: 4 },
                        ]}
                    >
                        สั่งเมื่อ {timestamp}
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
        alignItems: "center",
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
