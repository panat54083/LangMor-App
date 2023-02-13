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

const HomeManage = ({ navigation }) => {
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
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //Turn the restaurant off or open
    const fetchRestaurantOpenClose = () => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/closed`, {
                restaurant_id: state.restaurantData._id,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSetting = () => {
        navigation.navigate("Setting");
    };
    const handleOpenClose = () => {
        fetchRestaurantOpenClose();
        fetchRestaurantInfo();
    };
    const handleMenu = () => {
        navigation.navigate("MenuTabs");
    };
    const handleOrder = () => {
        navigation.navigate("OrderTabs");
    };
    return (
        <>
            {state.restaurantData ? (
                <SafeAreaView style={styles.container}>
                    <ImageBackground
                        source={{
                            uri: `data:${state.restaurantData.picture.type}/jpg;base64,${state.restaurantData.picture.base64}`,
                        }}
                        resizeMode="cover"
                        style={styles.image_background}
                    >
                        <View style={styles.overlay}>
                            <Text style={[styles.header_text, styles.text]}>
                                {state.restaurantData.name}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.scrollView}>
                        <ScrollView>
                            <View style={styles.large_button}>
                                <Large
                                    label="ออเดอร์วันนี้"
                                    image={require("../assets/icons/order.png")}
                                    numberOfLines={1}
                                    onPress={handleOrder}
                                />
                            </View>
                            <View style={styles.small_button}>
                                <Small
                                    label="เมนู/สินค้า"
                                    image={require("../assets/icons/menu.png")}
                                    onPress={handleMenu}
                                />
                                <>
                                    {state.restaurantData.closed ? (
                                        <Small
                                            label="ร้านเปิดอยู่"
                                            image={require("../assets/icons/open.png")}
                                            onPress={handleOpenClose}
                                        />
                                    ) : (
                                        <Small
                                            label="ร้านปิดแล้ว"
                                            image={require("../assets/icons/closed.png")}
                                            onPress={handleOpenClose}
                                        />
                                    )}
                                </>
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
                                    onPress={handleSetting}
                                />
                            </View>
                        </ScrollView>
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
        flex: 1,
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
        justifyContent: "center",
    },
    header_text: {
        marginLeft: "5%",
    },
    scrollView: {
        flex: 4,
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 28,
        color: "#FF4200",
    },
    large_button: {
        // backgroundColor:"red",
        marginTop: "5%",
        marginHorizontal: "5%",
        height: "25%",
    },
    small_button: {
        // backgroundColor:"blue",
        justifyContent: "space-between",
        marginHorizontal: "5%",
        flexWrap: "wrap",
        flexDirection: "row",
    },
});
