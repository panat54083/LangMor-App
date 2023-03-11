// Packages
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    SectionList,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditProfile = ({navigation}) => {
        //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: "จัดการโปรไฟล์",
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
    <View>
      <Text>EditProfile</Text>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})