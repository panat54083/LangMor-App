// Packages
import React, { useContext, useEffect } from "react";
import axios from "axios";
// Components
import { StyleSheet, Text, View } from "react-native";
import UserContext from "../hooks/context/UserContext";
// Configs
import { IP_ADDRESS } from "@env";

const HomeManage = () => {
    const { state, onAction } = useContext(UserContext);

    useEffect(() => {
        fetchRestaurantInfo();
    }, []);
    const fetchRestaurantInfo = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/info?restaurant=${state.userData.restaurant}`
            )
            .then((res) => {
                console.log(res.data.restaurantData)
                onAction.updateRestaurantData({
                    restaurant: res.data.restaurantData,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <View>
            <Text>HomeManage</Text>
        </View>
    );
};

export default HomeManage;

const styles = StyleSheet.create({});
