//Packages
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { Button, StyleSheet, Text, View } from "react-native";
import OrderCard from "../../components/Cards/OrderCard";
//Config
import SocketContext from "../../hooks/context/SocketContext";
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const DeliverOrder = ({ navigation }) => {
    //config
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //data
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (isFocused) {
            apiShowOrder();
        }
    }, [isFocused]);

    const apiShowOrder = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/order/get?restaurant_id=${
                    state.restaurantData._id
                }&&status=${"deliver"}`
            )
            .then((res) => {
                // console.log(res.data.orders);
                setOrders(res.data.orders);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSelectOrder = (order) => {
        navigation.navigate("Chat", {
            orderData: order.order,
            customerData: order.customer,
        });
    };

    const handleDebugger = () => {
        console.log(orders);
    };
    return (
        <View style={styles.container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            {orders
                ? orders.map((order, index) => (
                      <OrderCard
                          key={index}
                          order_number={order.order.order_number}
                          onPress={() => handleSelectOrder(order)}
                          name={order.customer.name}
                          time={order.order.createdAt}
                      />
                  ))
                : ""}
        </View>
    );
};

export default DeliverOrder;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});
