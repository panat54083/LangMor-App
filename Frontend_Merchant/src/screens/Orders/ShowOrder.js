//Packages
import React, { useEffect } from "react";
import axios from "axios";
//Components
import { StyleSheet, Text, View, Button } from "react-native";
import AddressBoxDetail from "../../components/Cards/Order/AddressBoxDetail";
import BackScreen from "../../components/buttons/BackScreen";
import OrderSummary from "../../components/Cards/Order/OrderSummary";
//Configs
import { IP_ADDRESS } from "@env";

const ShowOrder = ({ navigation, route }) => {
    const room = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: `ออเดอร์ของ ${room.customer.name}`,
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

    const handleDebugger = () => {
        console.log(room)
    }
    return (
        <View style={styles.container}>
            <Button title="Debugger" onPress={handleDebugger}/>
            <AddressBoxDetail address={"eiei"}/>
            <OrderSummary/>
        </View>
    );
};

export default ShowOrder;

const styles = StyleSheet.create({
    container: {
    },
});
