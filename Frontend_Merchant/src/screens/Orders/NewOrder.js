//Packages
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//Components
import { StyleSheet, Text, View } from "react-native";
import OrderCard from "../../components/Cards/OrderCard";
//Config
import SocketContext from "../../hooks/context/SocketContext";
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const NewOrder = () => {
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);

    const fetchChatrooms = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?restaurantId=${state.restaurantData._id}`
            )
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <View>
            <Text>NewOrder</Text>
            <OrderCard />
        </View>
    );
};

export default NewOrder;

const styles = StyleSheet.create({});
