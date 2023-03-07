//packages
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Pressable,
    Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/cards/Chat/ChatInput";
import MessageModel from "../../components/cards/Chat/MessageModel";
import OrderMessage from "../../components/cards/Chat/OrderMessage";
//configs
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";
import SocketContext from "../../hooks/context/SocketContext";
import { IP_ADDRESS } from "@env";

const Chat2 = ({ navigation, route }) => {
    //Configs
    const { itemData, chatroomData } = route.params;
    //Data
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: `${itemData.name}`,
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
        // Functions
    }, []);

    const handleDebugger = () => {
        console.log(itemData);
    };
    return (
        <View>
            <Button title="Debugger" onPress={handleDebugger} />
        </View>
    );
};

export default Chat2;

const styles = StyleSheet.create({});
