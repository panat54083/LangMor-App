//Packages
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//Components
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import AddressBoxDetail from "../../components/buttons/AddressBoxDetail";
import OrderListSummary from "../../components/cards/OrderListSummary";
import SubmitBtn from "../../components/buttons/SubmitBtn";
//Configs
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const Cart = ({ route, navigation }) => {
    const { basketDetail } = useContext(BasketContext);
    const { state } = useContext(UserContext);
    const [chatroomData, setChatroomData] = useState(null);
    const basketDetail_foods = [
        {
            amount: 2,
            food: {
                __v: 0,
                _id: "63e9200cdaf3c449c4bb7c3c",
                description: "อาหารคลีน น้ำมันเยิ้ม",
                name: "อกไก่ทอด",
                options: [Array],
                picture: [Object],
                price: 10,
                restaurant_id: "63e188c58ae333a7867b14f2",
                type: "อาหารคลีน",
            },
            id: 1,
            moreDetail: "ไม่เอาผัก",
            options: [{"name": "ระดับความเผ็ด", "price": 10, "required": false, "value": "เผ็ดมาก"}],
            price: 20,
        },
        {
            amount: 1,
            food: {
                __v: 0,
                _id: "63e9200cdaf3c449c4bb7c3c",
                description: "อาหารคลีน น้ำมันเยิ้ม",
                name: "อกไก่ทอด",
                options: [Array],
                picture: [Object],
                price: 10,
                restaurant_id: "63e188c58ae333a7867b14f2",
                type: "อาหารคลีน",
            },
            id: 2,
            moreDetail: null,
            options: [[Object]],
            price: 10,
        },
        {
            amount: 1,
            food: {
                __v: 0,
                _id: "63e9323adaf3c449c4bb7c7d",
                description: "",
                name: "ผัดกาดขาว",
                options: [Array],
                picture: null,
                price: 0,
                restaurant_id: "63e188c58ae333a7867b14f2",
                type: "อาหารคาว",
            },
            id: 3,
            moreDetail: "no spicy",
            options: [],
            price: 0,
        },
    ];
    useEffect(() => {
        navigation.setOptions({
            title: basketDetail.restaurant.name,
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} />
            ),
            headerTitleStyle: { fontSize: 22, fontFamily: "Kanit-Bold" },
        });
    }, []);
    useEffect(() => {
        if (chatroomData) {
            navigation.navigate("Chat", {
                chatroomData: chatroomData,
                restaurantData: basketDetail.restaurant,
            });
        }
    }, [chatroomData]);

    const findPriceOfOrder = () => {
        let priceOfOrder = 0;
        if (basketDetail.foods.length !== 0) {
            basketDetail.foods.forEach((food) => {
                let foodPrice = food.food.price;
                food.options.forEach((option) => {
                    if (Array.isArray(option.price)) {
                        const sum = option.price.reduce(
                            (partialSum, price) => partialSum + price,
                            0
                        );
                        foodPrice = foodPrice + sum;
                    } else {
                        foodPrice = foodPrice + option.price;
                    }
                });
                for (let i = 0; i < food.amount; i++) {
                    priceOfOrder = priceOfOrder + foodPrice;
                }
            });
        }
        return priceOfOrder;
    };

    const createChatroom = async () => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/create`, {
                customerId: state.userData._id,
                restaurantId: basketDetail.restaurant._id,
            })
            .then((res) => {
                setChatroomData(res.data.chatroomData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSubmit = () => {
        // console.log(basketDetail.foods)
        // console.log(basketDetail.restaurant)
        // console.log(state.userData._id)
        createChatroom();
    };
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
                        <OrderListSummary allprice={findPriceOfOrder()} />
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
                <SubmitBtn label={"สั่งซื้อ"} onPress={handleSubmit} />
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({});
