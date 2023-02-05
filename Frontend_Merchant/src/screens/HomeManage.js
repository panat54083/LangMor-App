// Packages
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
// Components
import { StyleSheet, Button, Text, View } from "react-native";
import UserContext from "../hooks/context/UserContext";
import Large from "../components/buttons/Large";
import Small from "../components/buttons/Small";
// Configs
import { IP_ADDRESS } from "@env";

const HomeManage = () => {
    const { state, onAction } = useContext(UserContext);
    //initial Screen
    useLayoutEffect(() => {
        // console.log(state.restaurantData)
        fetchRestaurantInfo();
    }, []);
    //get Restaurant's information
    const fetchRestaurantInfo = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/info?restaurant_id=${state.userData.restaurant}`
            )
            .then((res) => {
                onAction.updateRestaurantData({
                    restaurant: res.data.restaurantData,
                });
                // setRestaurantData(res.data.restaurantData)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleButton = () => {
        console.log(state.restaurantData);
    };
    return (
        <>
            {state.restaurantData ? (
                <View>
                    <Text>{state.restaurantData.name} </Text>
                    <View style={styles.large_button}>
                        <Large
                            label="ออเดอร์วันนี้"
                            image={require("../assets/icons/order.png")}
                            numberOfLines={1}
                        />
                    </View>
                    <View style={styles.small_button}>
                        <Small
                            label="เมนู/สินค้า"
                            image={require("../assets/icons/menu.png")}
                        />
                        <Small
                            label="เวลา เปิด-ปิด"
                            image={require("../assets/icons/calendar.png")}
                        />
                        <Small
                            label="แก้ไขข้อมูลร้าน"
                            image={require("../assets/icons/restaurant.png")}
                        />
                        <Small
                            label="ประวัติการสั่งซื้อ"
                            image={require("../assets/icons/clock.png")}
                        />
                        <Small
                            label="การตั้งค่า"
                            image={require("../assets/icons/gear.png")}
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <Text> Loading Screen</Text>
                </View>
            )}
        </>
    );
};

export default HomeManage;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    large_button: {
        marginHorizontal: "5%",
    },
    small_button: {
        justifyContent:"space-between",
        marginHorizontal: "5%",
        flexWrap: "wrap",
        flexDirection:"row",
    },
});
