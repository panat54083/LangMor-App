import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

const CardRestaurantName = (props) => {
    const { restaurant } = props;
    return (
        <View style={styles.container}>
            <View style={styles.restName}>
                <View style={{ flex: 0, 
                    // backgroundColor: "red" 
                    }}>
                    <Text
                        style={styles.textHeader}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                    >
                        {restaurant.name}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    // backgroundColor: "blue",
                }}
            >
                <Ionicons
                    name="location-outline"
                    size={24}
                    color="#FF7A00"
                    style={{ marginHorizontal: "5%" }}
                />
                <Text
                    style={{
                        fontFamily: "Kanit-SemiBold",
                        fontSize: 14,
                        color: "#9D9693",
                    }}
                >
                    {restaurant.address ? restaurant.address : "ไม่ได้ระบุ"}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    // justifyContent: "space-around",
                }}
            >
                <Feather
                    name="phone"
                    size={20}
                    color="#FF7A00"
                    style={{ marginHorizontal: "5.5%" }}
                />
                <Text
                    style={{
                        fontFamily: "Kanit-SemiBold",
                        fontSize: 14,
                        color: "#9D9693",
                    }}
                >
                    {restaurant.phone ? restaurant.phone : "ไม่ได้ระบุ"}
                </Text>
            </View>
        </View>
    );
};

export default CardRestaurantName;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: "2%",
        // height: 100,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#FFFFFF",
        // paddingTop: 16,
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
        marginLeft: "10%",
        fontSize: 20,
        fontFamily: "Kanit-Bold",
    },
});
