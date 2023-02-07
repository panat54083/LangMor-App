//Packages
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Components
import { StyleSheet, Text, View } from "react-native";
//Screens
import MenuManage from "../../screens/Menu/MenuManage";
import OptionsManage from "../../screens/Menu/OptionsManage";
import BackScreen from "../../components/buttons/BackScreen";
//Configs
const Tab = createMaterialTopTabNavigator();

const MenuTabs = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "จัดการเมนูร้านค้า",
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
        <Tab.Navigator
            Style={{}}
            screenOptions={{
                tabBarActiveTintColor: "#ff4200",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: { fontSize: 16, fontFamily: "Kanit-Medium" },
                tabBarStyle: {
                    backgroundColor: "#FFE8E0",
                    // backgroundColor: "#FFf",
                },
                tabBarIndicatorStyle: {
                    borderBottomColor: "#FF4200",
                    borderBottomWidth: 4,
                    // color: "black"
                },
            }}
        >
            <Tab.Screen
                name="MenuManage"
                component={MenuManage}
                options={{ tabBarLabel: "เมนูร้าน" }}
            />
            <Tab.Screen
                name="OptionsManage"
                component={OptionsManage}
                options={{ tabBarLabel: "ตัวเลือกเสริม" }}
            />
        </Tab.Navigator>
    );
};

export default MenuTabs;

const styles = StyleSheet.create({});
