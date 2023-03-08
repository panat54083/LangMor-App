//Packages
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const ChatLostItem = ({navigation}) => {
    return (
        <View>
            <Text>ChatLostItem</Text>
        </View>
    );
};

export default ChatLostItem;

const styles = StyleSheet.create({});
