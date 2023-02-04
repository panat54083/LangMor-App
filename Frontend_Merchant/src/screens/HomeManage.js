import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { IP_ADDRESS } from "@env";
import UserContext from "../hooks/context/UserContext";
const HomeManage = () => {
    const { state } = useContext(UserContext);
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
