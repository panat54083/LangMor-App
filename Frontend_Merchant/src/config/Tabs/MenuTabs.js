//Packages
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Components
import { StyleSheet } from "react-native";
import MyTabBar from "../../components/Navigaitons/MyTabBar";
import BackScreen from "../../components/buttons/BackScreen";
//Screens
import MenuManage from "../../screens/Menu/MenuManage";
import OptionsManage from "../../screens/Menu/OptionsManage";
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
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
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
