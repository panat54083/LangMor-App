//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import OrderCard from "../../components/Cards/OrderCard";

const OrderManage = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "ออเดอร์วันนี้",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 22,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => navigation.goBack()}
                    color="#FF7A00"
                />
            ),
        });
    }, []);

    return (
        <View style={styles.container}>
            <OrderCard/>
        </View>
    );
};

export default OrderManage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    }
});
