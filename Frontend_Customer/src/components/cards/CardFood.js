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
        <TouchableOpacity
            onPress={handlerOnPress}
            style={[styles.card, styles.container]}
        >
            {food.picture ? (
                <View style={{ flex: 0.45 }}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: `${food.picture.url}`,
                        }}
                    />
                </View>
            ) : null}
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-evenly",
                    // backgroundColor: "red",
                }}
            >
                <Text style={styles.foodName}>{food.name}</Text>
                {food.description ? (
                    <Text
                        style={[styles.foodDetail, { width: "100%" }]}
                        // adjustsFontSizeToFit={true}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {food.description}
                    </Text>

                ):(
                    null
                )}
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>฿ {Number(food.price).toLocaleString()}</Text>
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
        </TouchableOpacity>
    );
};

export default CardFood;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        // borderRadius: 20,
        borderColor: "#ddd",
        minHeight: 90,
        flex: 1,
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
        // backgroundColor:'red'
    },
    logo: {
        width: 75,
        height: 75,
        borderRadius: 10,
        // marginRight: 16,
    },
    foodName: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
    },
    price: {
        fontSize: 16,
        fontFamily: "Kanit-SemiBold",
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
        // marginBottom: 19,
        color: "#C9C5C4",
        fontSize: 16,
        fontFamily: "Kanit-Medium",
    },
});
