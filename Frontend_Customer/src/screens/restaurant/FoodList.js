import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../../components/buttons/Back";
import FoodListHeader from "../../components/headers/FoodListHeader";
import CardRestaurantName from "../../components/cards/CardRestaurantName";
import Searchbar from "../../components/searchs/Searchbar";

const FoodList = ({ route, navigation }) => {
    const { restaurant } = route.params;
    // ของจริง fecth จาก restaurant
    const foodData = [{ tags: "ของคาว", data: ["ข้าวผัด", "กระเพราหมูกรอบ"] }];
    return (
        <View>
            <FoodListHeader />
            <View style={{ marginTop: -50 }}>
                <CardRestaurantName restaurant={restaurant} />
            </View>
            <View
                style={{
                    backgroundColor: "#D9D9D9",
                    height: 55,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Searchbar height="45" />
            </View>
        </View>
    );
};

export default FoodList;

const styles = StyleSheet.create({});
