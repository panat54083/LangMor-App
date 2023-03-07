//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Botton } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const BuySecond = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listSecondHands, setListSecondHands] = useState([])
    //Start up
    useEffect(() => {
        if (isFocused) {
            api_getAllSecondHands()
        }
    }, [isFocused]);

    const api_getAllSecondHands= () => {
        axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getAll`
            )
            .then((res) => {
                console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <ScrollView>
            <Text>BuySecond screen</Text>
            {
                listSecondHands.map((item, index)=>(
                    <Text key={index}>{item.name}</Text>
                ))
            }
        </ScrollView>
    );
};

export default BuySecond;

const styles = StyleSheet.create({});
