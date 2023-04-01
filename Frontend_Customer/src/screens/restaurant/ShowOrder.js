// Packages
import React, { useState, useContext, useEffect } from "react";
// Components
import { StyleSheet, Text, View, ScrollView ,Button} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import AddressDetail from "../../components/cards/Order/AddressDetail";
import OrderSummary from "../../components/cards/Order/OrderSummary";
import SubmitBtn from "../../components/buttons/SubmitBtn";
//Configs
import UserContext from "../../hooks/context/UserContext";

const ShowOrder = ({ navigation, route }) => {
    const order = route.params;
    const { state } = useContext(UserContext);
    useEffect(() => {
        navigation.setOptions({
            title: `ออเดอร์ของ ${state.userData.given_name}`,
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 20,
            },
            headerLeft: () => (
                <BackScreen onPress={handleGoBack} color="#FF7A00" />
            ),
        });
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleGotoChat = () => {
        navigation.navigate("Chat", {
            orderData: order.order,
            restaurantData: order.restaurant,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.detail}>
                <ScrollView>
                    <AddressDetail address={order.order.address} />
                    <OrderSummary order={order.order} />
                </ScrollView>
            </View>
            <View style={styles.submit}>
                <SubmitBtn label={"เข้าสู่หน้าแชท"} onPress={handleGotoChat} />
            </View>
        </View>
    );
};

export default ShowOrder;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex: 1,
    },
    detail: {
        margin: 5,
        flex: 10,
    },
    submit: {
        flex: 1,
        justifyContent: "space-between",
    },
});
