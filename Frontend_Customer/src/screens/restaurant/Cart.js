import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import BasketContext from "../../hooks/context/BasketContext";
import BackScreen from "../../components/buttons/BackScreen";

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
    return (
        <View>
            <Text>สวัสดีนี้คือหน้าสรุปรายการ</Text>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({});
