// Packages
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
import OrderCard from "../components/Cards/OrderCard";
import BackScreen from "../components/buttons/BackScreen";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../hooks/context/UserContext";

const History = ({ navigation }) => {
    //Configs
    const isFocused = useIsFocused();
    //Variables
    const { state } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: "ประวัติการขาย",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 22,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => navigation.goBack()}
                    color="#FF7A00"
                />
            ),
        });
    }, []);

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
                `http://${IP_ADDRESS}/order/get?restaurant_id=${
                    state.restaurantData._id
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
        // console.log(order)
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
                            name={item.customer.name}
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
                    <Text style={[styles.header, { color: "#9D9693", fontFamily: "Kanit-Medium", fontSize: 16 }]}>
                        {title}
                    </Text>
                )}
            />
        </View>
    );
};

export default History;

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

const order_dummy = {
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
        _id: "63fa2e600713c181d3a10b12",
        address: "หลังมจพ.",
        cart: [[Object]],
        createdAt: "2023-02-25T15:50:56.783Z",
        customerId: "63f46d5f0ee8a09a91096666",
        order_number: 1,
        restaurantId: "63f46de10ee8a09a91096673",
        status: "close",
        updatedAt: "2023-03-09T14:17:51.870Z",
    },
};

const d = {
    index: 0,
    item: {
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
            _id: "63fa2e600713c181d3a10b12",
            address: "หลังมจพ.",
            cart: [Array],
            createdAt: "2023-02-25T15:50:56.783Z",
            customerId: "63f46d5f0ee8a09a91096666",
            order_number: 1,
            restaurantId: "63f46de10ee8a09a91096673",
            status: "close",
            updatedAt: "2023-03-09T14:17:51.870Z",
        },
    },
    section: { data: [[Object]], title: "25/02/2023" },
    separators: {
        highlight: [Function],
        unhighlight: [Function],
        updateProps: [Function],
    },
};
