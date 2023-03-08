//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const ChatSecondHand = ({navigation}) => {
    return (
        <View>
            <Text>ChatSecondHand</Text>
        </View>
    );
};

export default ChatSecondHand;

const styles = StyleSheet.create({});
