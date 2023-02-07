//Packages
import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Components
import { StyleSheet, Text, View } from "react-native";
//Screens
import MenuManage from "../../screens/Menu/MenuManage";
import OptionsManage from "../../screens/Orders/OptionsManage";
//Configs
const Tab = createMaterialTopTabNavigator();

const MenuTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="MenuManage" component={MenuManage} />
            <Tab.Screen name="OptionsManage" component={OptionsManage} />
        </Tab.Navigator>
    );
};

export default MenuTabs;

const styles = StyleSheet.create({});
