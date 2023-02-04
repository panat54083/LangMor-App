import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

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
            <TabStack.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => {
                        return (
                            <MaterialCommunityIcons
                                name="home-search-outline"
                                size={24}
                                color="#FF4200"
                            />
                        );
                    },
                    tabBarOptions: {
                        showIcon: true,
                    },
                }}
            />
            <TabStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => {
                        return (
                            <FontAwesome5
                                name="user"
                                size={19}
                                color="#FF4200"
                            />
                        );
                    },
                    tabBarOptions: {
                        showIcon: true,
                    },
                }}
            />
        </TabStack.Navigator>
    );
};

export default TapStackRoutes;

const styles = StyleSheet.create({});
