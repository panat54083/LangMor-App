import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../../components/buttons/Back";
import FoodListHeader from "../../components/headers/FoodListHeader";
const FoodList = ({ route, navigation }) => {
    const { restaurant } = route.params;

    return (
        <View>
            <FoodListHeader/>
        </View>
    );
};

export default FoodList;

const styles = StyleSheet.create({});
