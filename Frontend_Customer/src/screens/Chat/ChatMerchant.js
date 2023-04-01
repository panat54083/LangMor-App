//Packages
import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    RefreshControl,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
} from "react-native";
import Order from "../../components/cards/Order/Order";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { API_URL } from "@env";

const ChatMerchant = ({ navigation }) => {
    //configs
    const isFocused = useIsFocused();
    const { state } = useContext(UserContext);
    const [refreshing, setRefreshing] = useState(false);
    //data
    const [orders, setOrders] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (isFocused) {
            apiShowOrder();
        }
    }, [isFocused]);

    useEffect(() => {
        if (refreshing) {
            apiShowOrder();
        }
    }, [refreshing]);
    // useEffect(() => {
    //     console.log(orders);
    // }, [orders]);
    const apiShowOrder = () => {
        axios
            .get(
                `${API_URL}/order/get?customer_id=${
                    state.userData._id
                }&&status=${"new,doing,deliver,done"}`
            )
            .then((res) => {
                // console.log(res.data.message);
                // console.log(res.data.orders);
                setOrders(res.data.orders);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };
    const handleChatroom = (order) => {
        navigation.navigate("Chat", {
            orderData: order.order,
            restaurantData: order.restaurant,
        });
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressBackgroundColor={"white"}
                        colors={["#FF7A00"]}
                    />
                }
            >
                {orders[0] ? (
                    orders.map((order, index) => (
                        <View key={index} style={styles.orderContainer}>
                            <Order
                                order={order}
                                onPress={() => handleChatroom(order)}
                            />
                        </View>
                    ))
                ) : (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            alignSelf: "center",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="chat-question"
                            size={100}
                            color="#C9C5C4"
                        />
                        <Text style={styles.font}>คุณยังไม่ได้ทำรายการ</Text>
                        <Text style={styles.font}>ติดต่อซื้อของร้านค้า</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ChatMerchant;

const styles = StyleSheet.create({
    orderContainer: {
        marginTop: "0.75%",
        marginBottom: "0.25%",
        width: "90%",
        alignSelf: "center",
    },
    font: {
        fontFamily: "Kanit-Bold",
        fontSize: 25,
        color: "#C9C5C4",
    },
});
