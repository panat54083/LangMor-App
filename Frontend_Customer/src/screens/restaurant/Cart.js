import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import BasketContext from "../../hooks/context/BasketContext";
import BackScreen from "../../components/buttons/BackScreen";
import AddressBoxDetail from "../../components/buttons/AddressBoxDetail";
import OrderListSummary from "../../components/cards/OrderListSummary";
import SubmitBtn from "../../components/buttons/SubmitBtn";

const Cart = ({ route, navigation }) => {
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    useEffect(() => {
        navigation.setOptions({
            title: basketDetail.restaurant.restaurantName,
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} />
            ),
            headerTitleStyle: { fontSize: 22, fontFamily: "Kanit-Bold" },
        });
    }, []);
    const findPriceOfOrder = () => {
        let priceOfOrder = 0;
        if (basketDetail.foods.length !== 0) {
            basketDetail.foods.forEach((food) => {
                let foodPrice = food.food.price;
                food.options.forEach((option) => {
                    if (Array.isArray(option.increasePrice)) {
                        const sum = option.increasePrice.reduce(
                            (partialSum, price) => partialSum + price,
                            0
                        );
                        foodPrice = foodPrice + sum;
                    } else {
                        foodPrice = foodPrice + option.increasePrice;
                    }
                });
                for (let i = 0; i < food.amount; i++) {
                    priceOfOrder = priceOfOrder + foodPrice;
                }
            });
        }
        return priceOfOrder;
    };
    const price = findPriceOfOrder();
    return (
        <View style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: "center", paddingBottom: "24%" }}>
                    <View
                        style={{
                            marginTop: 8,
                            width: "92.53%",
                        }}
                    >
                        <AddressBoxDetail />
                    </View>
                    <View style={{ marginTop: 8, width: "92.53%" }}>
                        <OrderListSummary allprice={price} />
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    width: "89.33%",
                    alignSelf: "center",
                    marginBottom: "7%",
                    position: "absolute",
                    bottom: 0,
                }}
            >
                <SubmitBtn label={"สั่งซื้อ"} />
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({});
