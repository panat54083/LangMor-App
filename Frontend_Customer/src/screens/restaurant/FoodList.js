import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../../components/buttons/Back";
const FoodList = ({ route, navigation }) => {
    const { restaurant } = route.params;

    return (
        <View>
            <Back />
            <Text>{restaurant.restaurantName}</Text>
        </View>
    );
};

export default FoodList;

const styles = StyleSheet.create({});
