//Packages
import React from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import OrderCard from "../../components/Cards/OrderCard";

const NewOrder = () => {
    return (
        <View>
            <Text>NewOrder</Text>
            <OrderCard />
        </View>
    );
};

export default NewOrder;

const styles = StyleSheet.create({});
