import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CardFood = (props) => {
    const { food, handlerOnPressCard } = props;
    const headerOnPress = () => {
        handlerOnPressCard(food);
    };
    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.card}>
                <TouchableOpacity onPress={headerOnPress}>
                    <View style={styles.container}>
                        <View>
                            {
                                food.picture ? (

                            <Image
                                style={styles.logo}
                                source={{
                                    uri: `data:${food.picture.type}/jpg;base64,${food.picture.base64}`,
                                }}
                            />
                                ): (
                                    <View></View>
                                )
                            }
                        </View>
                        <View style={{ width: "65%", height: 88 }}>
                            <Text style={styles.foodName}>{food.name}</Text>
                            <View>
                                {food.description ? (
                                    <Text style={styles.foodDetail}>
                                        {food.description}
                                    </Text>
                                ) : null}
                                <View style={styles.priceContainer}>
                                    <Text style={styles.props}>ราคา </Text>
                                    <Text style={styles.price}>
                                        {food.price}
                                    </Text>
                                    <Text style={styles.props}> บาท</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CardFood;

const styles = StyleSheet.create({
    logo: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 16,
    },
    container: {
        width: "92%",
        height: 127,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "93%",
        height: 127,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    foodName: {
        fontSize: 18,
        fontFamily: "Kanit-Bold",
    },
    price: {
        fontSize: 18,
        fontFamily: "Kanit-Bold",
        color: "#FF4200",
    },
    pricedetails: {
        fontSize: 13,
        fontFamily: "Kanit-Medium",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    foodDetail: {
        marginBottom: 19,
        fontSize: 10,
        fontFamily: "Kanit-Medium",
    },
});
