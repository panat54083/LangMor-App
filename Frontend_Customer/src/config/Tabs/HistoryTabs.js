//Packages
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Components
import { StyleSheet } from "react-native";
import MyTabBar from "../../components/Navigaitons/MyTabBar";
import MyTabBar2 from "../../components/Navigaitons/MyTabBar2";
import BackScreen from "../../components/buttons/BackScreen";
//Screens

import RestaurantHistory from "../../screens/History/RestaurantHistory";
import SecondHistory from "../../screens/History/SecondHistory";
import LostHistory from "../../screens/History/LostHistory";

//Configs
const Tab = createMaterialTopTabNavigator();

const HistoryTabs = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "ประวัติการทำรายการ",
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
    return (
        <Tab.Navigator tabBar={(props) => <MyTabBar2 {...props} />}>
            <Tab.Screen
                name="RestaurantHistory"
                component={RestaurantHistory}
                options={{ tabBarLabel: "ร้านค้า" }}
            />
            <Tab.Screen
                name="SecondHistory"
                component={SecondHistory}
                options={{ tabBarLabel: "ของมือสอง" }}
            />
            <Tab.Screen
                name="LostHistory"
                component={LostHistory}
                options={{ tabBarLabel: "ของหาย" }}
            />
        </Tab.Navigator>
    );
};

export default HistoryTabs;

const styles = StyleSheet.create({});
