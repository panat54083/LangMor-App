//Packages
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
//Components
import { StyleSheet, Text, View } from "react-native";
import {
    MaterialCommunityIcons,
    FontAwesome5,
    AntDesign,
    Octicons,
} from "@expo/vector-icons";
//Screens
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ChatTabs from "./Tabs/ChatTabs";
import HistoryTabs from "./Tabs/HistoryTabs";
//Configs
const TabStack = createMaterialBottomTabNavigator();

const TapStackRoutes = () => {
    const theme = useTheme();
    theme.colors.secondaryContainer = "transperent";
    return (
        <TabStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            shifting={true}
            sceneAnimationEnabled={true}
            sceneAnimationType="shifting"
            activeColor="#FF4200"
            inactiveColor="#C9C5C4"
            barStyle={{
                height: 65,
                backgroundColor: "white",
            }}
        >
            <TabStack.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: (
                        <Text style={{ fontFamily: "Kanit-Bold" }}>Home</Text>
                    ),
                    tabBarIcon: ({ color }) => {
                        return (
                            <MaterialCommunityIcons
                                name="home-search-outline"
                                size={24}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <TabStack.Screen
                name="ChatTabs"
                component={ChatTabs}
                options={{
                    tabBarLabel: (
                        <Text style={{ fontFamily: "Kanit-Bold" }}>Chat</Text>
                    ),
                    tabBarIcon: ({ color }) => {
                        return (
                            <AntDesign
                                name="message1"
                                size={24}
                                color={color}
                            />
                        );
                    },
                }}
            />
            {/* <TabStack.Screen
                name="HistoryTabs"
                component={HistoryTabs}
                options={{
                    tabBarLabel: (
                        <Text style={{ fontFamily: "Kanit-Bold" }}>
                            History
                        </Text>
                    ),
                    tabBarIcon: ({ color }) => {
                        return (
                            <Octicons name="history" size={24} color={color} />
                        );
                    },
                }}
            /> */}
            <TabStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: (
                        <Text style={{ fontFamily: "Kanit-Bold" }}>
                            Profile
                        </Text>
                    ),
                    tabBarIcon: ({ color }) => {
                        return (
                            <FontAwesome5 name="user" size={19} color={color} />
                        );
                    },
                }}
            />
        </TabStack.Navigator>
    );
};

export default TapStackRoutes;

const styles = StyleSheet.create({});
