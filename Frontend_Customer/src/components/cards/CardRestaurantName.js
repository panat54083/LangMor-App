import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

const CardRestaurantName = (props) => {
    const { restaurant } = props;
    return (
        <View style={styles.container}>
            <View style={styles.restName}>
                <View style={{ flex: 0, alignItems: "flex-start" , }}>
                    <Text
                        style={styles.textHeader}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                    >
                        {restaurant.name}
                    </Text>
                </View>
                {/* <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={{}}>
                        <Ionicons
                            name="chevron-forward"
                            size={27}
                            color="#FF7A00"
                            style={{ marginRight: "10.1%" }}
                        />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-evenly",
                }}
            >
                <Ionicons name="location-outline" size={24} color="#FF7A00" />
                <Text style={{ fontFamily: "Kanit-SemiBold", fontSize: 14, color:"#9D9693"}}>
                    {restaurant.address ? restaurant.address : "ไม่ได้ระบุ"}
                </Text>
                <Feather name="phone" size={20} color="#FF7A00" />
                <Text style={{ fontFamily: "Kanit-SemiBold" ,fontSize:14, color:"#9D9693"}}>
                    {restaurant.phone ? restaurant.phone : "ไม่มี"}
                </Text>
                {/* <View style={[styles.rating, {}]}>
                    <View style={{ flex: 0 }}>
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color="#FF7A00"
                        />
                    </View>
                    <View style={{ flex: 0 }}>
                        <Text style={{ fontFamily: "Kanit-SemiBold" }}>
                            {restaurant.address
                                ? restaurant.address
                                : "ไม่ได้ระบุ"}
                        </Text>
                    </View>
                </View>
                <View style={styles.rating}>
                    <View style={{ flex: 0 }}>
                        <Feather name="phone" size={20} color="#FF7A00" />
                    </View>
                    <View style={{ flex: 0 }}>
                        <Text style={{ fontFamily: "Kanit-SemiBold" }}>
                            {restaurant.phone ? restaurant.phone : "ไม่มี"}
                        </Text>
                    </View>
                </View> */}
            </View>
        </View>
    );
};

export default CardRestaurantName;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 12,
        // height: 100,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#FFFFFF",
        paddingTop: 16,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: "#000000",
        elevation: 15,
    },
    restName: {
        flexDirection: "row",
        // justifyContent: "flex-end",
        marginBottom: 10,
    },
    rating: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "12.5%",
        alignItems: "baseline",
    },
    textHeader: {
        marginLeft: "25%",
        fontSize: 22,
        fontFamily: "Kanit-Bold",
    },
});
