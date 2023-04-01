//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import AddressBoxDetail from "../../components/Cards/Order/AddressBoxDetail";
import BackScreen from "../../components/buttons/BackScreen";
import OrderSummary from "../../components/Cards/Order/OrderSummary";
import AcceptButton from "../../components/buttons/AcceptButton";
//Configs

const ShowOrder = ({ navigation, route }) => {
    const order = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: `ออเดอร์ของ ${order.customer.name}`,
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 20,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => navigation.goBack()}
                    color="#FF7A00"
                />
            ),
        });
    }, []);
    const handleGotoChat = () => {
        navigation.navigate("Chat", {
            orderData: order.order,
            customerData: order.customer,
        });
    };
    const handleDebugger = () => {
        console.log(order);
    };
    return (
        <View style={styles.container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.detail}>
                <ScrollView>
                    <AddressBoxDetail address={order.order.address} />
                    <OrderSummary order={order.order} />
                </ScrollView>
            </View>
            <View style={styles.submit}>
                <AcceptButton label={"เข้าสู่หน้าแชท"} onPress={handleGotoChat} />
            </View>
        </View>
    );
};

export default ShowOrder;

const styles = StyleSheet.create({
    container: { marginHorizontal: 10, flex: 1 },
    detail: {
        margin: 5,
        flex: 10,
    },
    submit: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: "red",
    },
});

const order = {
    customer: {
        __v: 0,
        _id: "63f46d5f0ee8a09a91096666",
        address: "",
        createdAt: "2023-02-21T07:06:07.150Z",
        email: "panat54083@gmail.com",
        family_name: "Pine",
        given_name: "Dipper",
        name: "Dipper Pine",
        picture:
            "https://lh3.googleusercontent.com/a/AEdFTp4gf41HTmLLKrbABIMKNYeOSu7ve6xSm8S-n9uK0w=s96-c",
        updatedAt: "2023-02-21T07:06:07.150Z",
        verified_email: true,
    },
    order: {
        __v: 0,
        _id: "63f5cc5ef9dbd1f1da501a21",
        address: "",
        cart: [[Object]],
        createdAt: "2023-02-22T08:03:42.402Z",
        customerId: "63f46d5f0ee8a09a91096666",
        restaurantId: "63f46de10ee8a09a91096673",
        status: "new",
        updatedAt: "2023-02-22T08:03:42.402Z",
    },
};
