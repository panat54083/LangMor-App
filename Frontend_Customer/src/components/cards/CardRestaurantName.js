import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CardRestaurantName = (props) => {
    const { restaurant } = props;
    return (
        <View style={styles.container}>
            <View style={styles.restName}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textHeader}>
                        {restaurant.name}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={{}}>
                        <Ionicons
                            name="chevron-forward"
                            size={27}
                            color="#FF7A00"
                            style={{ marginRight: "10.1%" }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rating}>
                <Text style={{ fontFamily: "Kanit" }}>
                    Rating : {restaurant.rating ? restaurant.rating : "ไม่มี"}{" รอเเก้ไขเป็นรายละเอียดร้านค้า"}
                </Text>
                <Ionicons name="star" size={18} color="#FF7A00" />
            </View>
        </View>
    );
};

export default CardRestaurantName;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical:12,
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
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    rating: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "12.5%",
    },
    textHeader: {
        marginLeft: "25%",
        fontSize: 22,
        fontFamily: "Kanit-Bold",
    },
});
