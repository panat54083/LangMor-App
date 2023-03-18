import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    SectionList,
} from "react-native";
//Components
import OrderCard from "../../components/cards/Order/OrderCard";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const RestaurantHistory = ({ navigation }) => {
    //Configs
    const isFocused = useIsFocused();
    //Variables
    const { state } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (isFocused) {
            apiShowOrder();
        }
    }, [isFocused]);

    const formatDate = (item) => {
        const date = new Date(item);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const output = `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
        }/${year}`;
        return output;
    };

    const formatToSectionList = (data) => {
        const result = [];
        const types = new Set();
        // get types
        data.forEach((item) => {
            const date = formatDate(item.order.createdAt);
            types.add(date);
        });
        // add object to specific type
        types.forEach((date) => {
            result.push({
                title: date,
                data: data.filter(
                    (item) => formatDate(item.order.createdAt) === date
                ),
            });
        });
        return result;
    };

    const apiShowOrder = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/order/get?customer_id=${
                    state.userData._id
                }&&status=${"close,cancel"}`
            )
            .then((res) => {
                // console.log(res.data.orders.length);
                setOrders(formatToSectionList(res.data.orders));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSelectOrder = (order) => {
        navigation.navigate("ShowOrder", order);
        // console.log(order);
    };
    return (
        <View style={styles.container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <SectionList
                sections={orders}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => (
                    <View style={[styles.orderCard, { marginBottom: "2%" }]}>
                        <OrderCard
                            key={index}
                            order_number={item.order.order_number}
                            onPress={() => handleSelectOrder(item)}
                            name={item.restaurant.name}
                            time={item.order.createdAt}
                            price={item.order.cart.reduce(
                                (total, item) => total + item.price,
                                0
                            )}
                            orderStatus={item.order.status}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.header, { color: "#1A0700" }]}>
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

export default RestaurantHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5f5f5",
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
        margin: 10,
    },
    orderCard: {
        marginHorizontal: 10,
    },
});
