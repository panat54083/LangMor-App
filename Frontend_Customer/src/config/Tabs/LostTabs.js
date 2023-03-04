//Packages
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Components
import { StyleSheet } from "react-native";
import MyTabBar from "../../components/Navigaitons/MyTabBar";
import BackScreen from "../../components/buttons/BackScreen";
//Screens
import FindLost from "../../screens/LostItems/FindLost";
import InformLost from "../../screens/LostItems/InformLost";
import MyPost from "../../screens/LostItems/MyPost";
//Configs
const Tab = createMaterialTopTabNavigator();

const LostTabs = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "ของหาย",
            headerStyle: {
                backgroundColor: "#FF7A00",
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
            headerTitleStyle: {
                fontFamily: "Kanit-SemiBold",
                fontSize: 24,
            },
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} color="white" />
            ),
        });
    }, []);

    return (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
            <Tab.Screen
                name="FindLost"
                component={FindLost}
                options={{ tabBarLabel: "ตามหาของหาย" }}
            />
            <Tab.Screen
                name="InformLost"
                component={InformLost}
                options={{ tabBarLabel: "แจ้งของหาย" }}
            />
            <Tab.Screen
                name="MyPost"
                component={MyPost}
                options={{ tabBarLabel: "ประกาศของฉัน" }}
            />
        </Tab.Navigator>
    );
};

export default LostTabs;

const styles = StyleSheet.create({});
