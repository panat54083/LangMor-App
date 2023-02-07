import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FoodDetailHeader from "../../components/headers/FoodDetailHeader";

const FoodDetail = ({ route, navigation }) => {
    const { food } = route.params;
    const handlerOnPressBack = () => {
        navigation.goBack();
    };
    return (
        <View>
            <FoodDetailHeader imgSrc={food.imgLink} handlerOnPressBack={handlerOnPressBack}/>
        </View>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({});
