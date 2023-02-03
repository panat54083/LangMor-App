import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
const TapStackRoutes = () => {
    const TabStack = createBottomTabNavigator();
    return (
        <TabStack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <TabStack.Screen name="Home" component={Home} />
            <TabStack.Screen name="Profile" component={Profile} />
        </TabStack.Navigator>
    );
};

export default TapStackRoutes;

const styles = StyleSheet.create({});
