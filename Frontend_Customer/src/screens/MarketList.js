import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Searchbar from "../components/searchs/Searchbar";
const MarketList = ({ navigation }) => {
    //ของจริงใช้ fetch ข้อมูลจาก backend
    const exampleData = [
        {
            id: 1,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            owner: "testuser01@gmail.com",
        },
        {
            id: 2,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            owner: "testuser01@gmail.com",
        },
        {
            id: 3,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            owner: "testuser01@gmail.com",
        },
        {
            id: 4,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            owner: "testuser01@gmail.com",
        },
        {
            id: 5,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            owner: "testuser01@gmail.com",
        },
        {
            id: 6,
            restaurantName: "ร้านป้านิด",
            description: "ร้านป้านิดสุดอร่อย",
            tags: ["ตามสั่ง"],
            address: "address01",
            owner: "testuser01@gmail.com",
        },
    ];
    
    return (
        <View>
            <Searchbar/>
            <Text>Hello MarketList</Text>
        </View>
    );
};

export default MarketList;

const styles = StyleSheet.create({});
