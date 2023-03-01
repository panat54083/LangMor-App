//Packages
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Components
import { StyleSheet } from "react-native";
import MyTabBar from "../../components/Navigaitons/MyTabBar";
import BackScreen from "../../components/buttons/BackScreen";
//Screens
import BuySecond from "../../screens/SecondHand/BuySecond";
import SellSecond from "../../screens/SecondHand/SellSecond";
//Configs
const Tab = createMaterialTopTabNavigator();

const SecondTabs = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            title: "ของมือสอง",
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
                name="BuySecond"
                component={BuySecond}
                options={{ tabBarLabel: "ซื้อของมืองสอง" }}
            />
            <Tab.Screen
                name="SellSecond"
                component={SellSecond}
                options={{ tabBarLabel: "ขายของมือสอง" }}
            />
        </Tab.Navigator>
    );
}; 

export default SecondTabs;

const styles = StyleSheet.create({});
