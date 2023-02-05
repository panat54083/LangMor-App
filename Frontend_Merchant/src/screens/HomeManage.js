// Packages
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
} from "react-native";
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
        console.log(state.restaurantData.picture);
    };
    return (
        <>
            {state.restaurantData ? (
                <SafeAreaView>
                    <ImageBackground
                        source={{
                            uri: `data:${state.restaurantData.picture.type}/jpg;base64,${state.restaurantData.picture.base64}`,
                        }}
                        resizeMode="cover"
                        style={styles.image_background}
                    >
                        <Text style={[styles.header_text, styles.text]}>
                            {state.restaurantData.name}
                        </Text>
                    </ImageBackground>

                    <View style={styles.large_button}>
                        <Large
                            label="ออเดอร์วันนี้"
                            image={require("../assets/icons/order.png")}
                            numberOfLines={1}
                            onPress={handleButton}
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
                </SafeAreaView>
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
        flex: 1,
    },
    image_background: {
        // flex:1
    },
    header_text: {
        paddingTop: 50,
        paddingBottom: 60,
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 28,
        color: "#FF4200",
    },
    large_button: {
        marginHorizontal: "5%",
    },
    small_button: {
        justifyContent: "space-between",
        marginHorizontal: "5%",
        flexWrap: "wrap",
        flexDirection: "row",
    },
});
