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

const NewOrder = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const [chatrooms, setChatrooms] = useState([]);
    const [orders, setOrders] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            apiShowOrder();
        }
    }, [isFocused]);
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
                `http://${IP_ADDRESS}/order/get?restaurant_id=${
                    state.restaurantData._id
                }&&status=${"new"}`
            )
            .then((res) => {
                // console.log(res.data.orders);
                setOrders(res.data.orders);
            })
            .catch((err) => {
                console.log(err);
            });
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

export default NewOrder;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

const order = {
    customer: {
        __v: 0,
        _id: "63f46d5f0ee8a09a91096666",
        address: "",
        createdAt: "2023-02-21T07:06:07.150Z",
        email: "panat54083@gmail.com",
        family_name: "Pine",
        given_name: "Dipper",
        name: "Dipper Pine",
        picture:
            "https://lh3.googleusercontent.com/a/AEdFTp4gf41HTmLLKrbABIMKNYeOSu7ve6xSm8S-n9uK0w=s96-c",
        updatedAt: "2023-02-21T07:06:07.150Z",
        verified_email: true,
    },
    order: {
        __v: 0,
        _id: "63f87b7a24ba8175c6483413",
        address: "กระสอบทราย",
        cart: [[Object], [Object]],
        createdAt: "2023-02-24T08:55:22.765Z",
        customerId: "63f46d5f0ee8a09a91096666",
        restaurantId: "63f46de10ee8a09a91096673",
        status: "new",
        updatedAt: "2023-02-25T07:33:43.480Z",
    },
};
