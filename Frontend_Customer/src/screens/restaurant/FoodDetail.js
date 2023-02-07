import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FoodDetail = ({ route, navigation }) => {
    const { food } = route.params;
    return (
        <View>
            <Text>Hello FoodDetail {food.name}</Text>
        </View>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({});
