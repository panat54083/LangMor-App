//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const SecondDetail = ({ route, navigation }) => {
    //Config
    const { secondData } = route.params;
    const {state} = useContext(UserContext)
    //data

    //start-up
    useEffect(() => {
        navigation.setOptions({
            title: secondData ? secondData.name : "(ไม่พบชื่อรายการสินค้า)",
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
    
    const handleDebugger = () => {
        console.log(secondData)
    }
    
    const handleContact= () => {
        console.log(secondData)
    }
    return (
        <View>
            {/* <Button title="Debugger" onPress={handleDebugger}/> */}
            <SubmitBtn label={"เริ่มแชทกับผู้ขาย"} onPress={handleContact}/>
        </View>
    );
};

export default SecondDetail;

const styles = StyleSheet.create({});
