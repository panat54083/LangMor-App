import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import BasketContext from "../../hooks/context/BasketContext";
import BackScreen from "../../components/buttons/BackScreen";
import AddressBoxDetail from "../../components/buttons/AddressBoxDetail";
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
        <View style={{ backgroundColor: "#F5F5F5" ,flex:1 }}>
            <View style={{ alignItems: "center" }}>
                <View style={{ marginTop: 8 }}>
                    <AddressBoxDetail />
                </View>
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({});
