import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const CardMarket = (props) => {
    const { restaurant, onPressCard } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onPressCard(restaurant);
            }}
            style={[styles.card, styles.shadow]}
        >
            <View style={styles.image_container}>
                {restaurant.picture ? (
                    <Image
                        style={styles.image}
                        source={{ uri: `${restaurant.picture.url}` }}
                    />
                ) : (
                    <MaterialIcons
                        name="local-restaurant"
                        size={50}
                        color="#1A0700"
                    />
                )}
            </View>
            <View style={styles.detail}>
                <Text
                    style={styles.restName}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                >
                    {restaurant.name}
                </Text>
                <View style={[styles.types,{width: "100%"}]}>
                    {restaurant.types ? (
                        <Text
                            style={styles.body}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            หมวดหมู่ :{" "}
                            {restaurant.types[0]
                                ? restaurant.types.join()
                                : "ไม่ได้ระบุ"}{" "}
                        </Text>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardMarket;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: "3%",
        height: 100,
        alignItems: "center",
        flexDirection: "row",
    },
    image_container: {
        height: 80,
        width: 80,
        backgroundColor: "#FFE8E0",
        margin: 15,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "#1A0701"
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
    },
    container: {
        width: "92%",
        height: 110,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    detail: {
        // backgroundColor: "red",
        marginLeft: "2%",
        height: "100%",
        justifyContent: "space-around",
    },
    types: {
        alignItems: "baseline",
    },
    restName: {
        fontSize: 23,
        fontFamily: "Kanit-SemiBold",
        color: "#1A0700",
    },
    body: {
        fontFamily: "Kanit-SemiBold",
        color: "#9D9693",
        // fontSize: 18,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
});
