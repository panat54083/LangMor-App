//Packages
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//Components
import { Button, StyleSheet, Text, View } from "react-native";
import OrderCard from "../../components/Cards/OrderCard";
//Config
import SocketContext from "../../hooks/context/SocketContext";
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const NewOrder = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const [chatrooms, setChatrooms] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {}, []);
    const fetchChatrooms = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?restaurantId=${state.restaurantData._id}`
            )
            .then((res) => {
                // console.log(res.data.message);
                setChatrooms(res.data.chatrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const apiShowOrder = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/order/get?restaurant_id=${state.restaurantData._id}&&status=${"new"}`
            )
            .then((res) => {
                // console.log(res.data.orders);
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDebugger = () => {
        // console.log(state.restaurantData);
        apiShowOrder()
    };
    const handleSelectOrderOld = (order) => {
        navigation.navigate("Chat", {
            orderData: order.order,
            customerData: order.customer,
        });
    };
    const handleSelectOrder = (order) => {
        navigation.navigate("ShowOrder", order);
    };
    return (
        <View>
            <Button title="Debugger" onPress={handleDebugger} />
            {orders
                ? orders.map((order, index) => (
                      <OrderCard
                          key={index}
                          onPress={() => handleSelectOrderOld(order)}
                          name={order.customer.name}
                      />
                  ))
                : ""}
        </View>
    );
};

export default NewOrder;

const styles = StyleSheet.create({});
