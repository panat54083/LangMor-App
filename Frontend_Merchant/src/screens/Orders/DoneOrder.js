//Packages
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { Button, StyleSheet, Text, View } from "react-native";
import OrderCard from "../../components/Cards/OrderCard";
//Config
import UserContext from "../../hooks/context/UserContext";
import { API_URL } from "@env";

const DoneOrder = ({ navigation }) => {
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
                `${API_URL}/order/get?restaurant_id=${
                    state.restaurantData._id
                }&&status=${"done"}`
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
                          price={order.order.cart.reduce(
                              (total, item) => total + item.price,
                              0
                          )}
                      />
                  ))
                : ""}
        </View>
    );
};

export default DoneOrder;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});
