import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import BasketContext from "../../hooks/context/BasketContext";
const CardFood = (props) => {
    const { food, handlerOnPressCard } = props;
    const { basketDetail } = useContext(BasketContext);
    const findAmountInBasket = () => {
        let number = 0;
        basketDetail.foods
            .filter((foodInBasket) => foodInBasket.food.name === food.name)
            .forEach((obj) => (number = number + obj.amount));
        return number;
    };
    const handlerOnPress = () => {
        handlerOnPressCard(
            food,
            basketDetail.foods.filter(
                (foodInBasket) => foodInBasket.food.name === food.name
            )
        );
    };
    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.card}>
                <TouchableOpacity onPress={handlerOnPress}>
                    <View style={styles.container}>
                        <View>
                            {food.picture ? (
                                <Image
                                    style={styles.logo}
                                    source={{
                                        uri: `${food.picture.url}`,
                                    }}
                                />
                            ) : (
                                <View></View>
                            )}
                        </View>
                        <View
                            style={{
                                flex: 1,
                                height: 88,
                                // backgroundColor: "red",
                            }}
                        >
                            <Text style={styles.foodName}>{food.name}</Text>
                            <View>
                                {food.description ? (
                                    <Text style={styles.foodDetail}>
                                        {food.description}
                                    </Text>
                                ) : null}
                                <View style={styles.priceContainer}>
                                    <Text
                                        style={{ fontFamily: "Kanit-Medium" }}
                                    >
                                        ราคา{" "}
                                    </Text>
                                    <Text style={styles.price}>
                                        {food.price}
                                    </Text>
                                    <Text
                                        style={{ fontFamily: "Kanit-Medium" }}
                                    >
                                        {" "}
                                        บาท
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {findAmountInBasket() !== 0 ? (
                            <View
                                style={{
                                    backgroundColor: "#FF7A00",
                                    paddingHorizontal: "4%",
                                    paddingVertical: "2%",
                                    borderRadius: 10,
                                    alignSelf: "flex-start",
                                    marginTop: "2%",
                                    marginRight: "2%",
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        color: "#FFFFFF",
                                        fontSize: 18,
                                        fontFamily: "Kanit-Bold",
                                    }}
                                >
                                    {findAmountInBasket()}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CardFood;

const styles = StyleSheet.create({
    logo: {
        width: 75,
        height: 75,
        borderRadius: 10,
        margin: 16,
    },
    container: {
        height: 90,
        alignItems: "center",
        // justifyContent: "flex-start",
        flexDirection: "row",
        // backgroundColor:'red'
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "93%",
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    foodName: {
        fontSize: 16,
        fontFamily: "Kanit-Bold",
    },
    price: {
        fontSize: 16,
        fontFamily: "Kanit-Bold",
        color: "#FF4200",
    },
    pricedetails: {
        fontSize: 11,
        fontFamily: "Kanit-Medium",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    foodDetail: {
        marginBottom: 19,
        fontSize: 8,
        fontFamily: "Kanit-Medium",
    },
});
