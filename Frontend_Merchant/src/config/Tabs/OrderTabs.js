//Packages
import React,{useEffect} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//components
import { StyleSheet, Text, View } from 'react-native'
import MyTabBar2 from '../../components/Navigaitons/MyTabBar2';
import BackScreen from '../../components/buttons/BackScreen';
//Screen
import NewOrder from '../../screens/Orders/NewOrder';
import DoingOrder from '../../screens/Orders/DoingOrder'
import DeliverOrder from '../../screens/Orders/DeliverOrder';
import DoneOrder from '../../screens/Orders/DoneOrder';
//Config
const Tab = createMaterialTopTabNavigator()

const OrderTabs = ({navigation}) => {
        useEffect(() => {
        navigation.setOptions({
            title: "ออเดอร์วันนี้",
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
    <Tab.Navigator tabBar={(props)=> <MyTabBar2 {...props}/>}>
        <Tab.Screen
        name='NewOrder'
        component={NewOrder}
                options={{ tabBarLabel: "ใหม่" }}
        />
        <Tab.Screen
        name='DoingOrder'
        component={DoingOrder}
                options={{ tabBarLabel: "กำลังทำ" }}
        />
        <Tab.Screen
        name='DeliverOrder'
        component={DeliverOrder}
                options={{ tabBarLabel: "กำลังส่ง" }}
        />
        <Tab.Screen
        name='DoneOrder'
        component={DoneOrder}
                options={{ tabBarLabel: "เสร็จสิ้น" }}
        />
    </Tab.Navigator>
  )
}

export default OrderTabs

const styles = StyleSheet.create({})