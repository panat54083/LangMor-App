//Packages
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Components
import { StyleSheet } from "react-native";
import MyTabBar from "../../components/Navigaitons/MyTabBar";
import MyTabBar2 from "../../components/Navigaitons/MyTabBar2";
import BackScreen from "../../components/buttons/BackScreen";
//Screens
import ChatMerchant from "../../screens/Chat/ChatMerchant";
import ChatSecondHand from "../../screens/Chat/ChatSecondHand";
import ChatLostItem from "../../screens/Chat/ChatLostItem";
//Configs
const Tab = createMaterialTopTabNavigator();

const ChatTabs = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "แชท",
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
                name="ChatMerchant"
                component={ChatMerchant}
                options={{ tabBarLabel: "ร้านค้า" }}
            />
            <Tab.Screen
                name="ChatSecondHand"
                component={ChatSecondHand}
                options={{ tabBarLabel: "ของมือสอง" }}
            />
            <Tab.Screen
                name="ChatLostItem"
                component={ChatLostItem}
                options={{ tabBarLabel: "ของหาย" }}
            />
        </Tab.Navigator>
    );
};

export default ChatTabs;

const styles = StyleSheet.create({});
