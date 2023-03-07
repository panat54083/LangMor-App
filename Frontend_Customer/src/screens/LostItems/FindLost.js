//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Botton } from "react-native";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const FindLost = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listOfLostItems, setListOfLostItems] = useState([]);
    //Start up
    useEffect(() => {
        if (isFocused) {
            api_getAllLostItems();
        }
    }, [isFocused]);
    const api_getAllLostItems = () => {
        axios
            .get(`http://${IP_ADDRESS}/lostItem/getAll?type=${"find"}`)
            .then((res) => {
                console.log(res.data.message);
                setListOfLostItems(res.data.listOfLostItems);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <View>
            <Text>FindLost screen</Text>
            {listOfLostItems.map((item, index) => (
                <Text key={index}>{item.name}</Text>
            ))}
        </View>
    );
};

export default FindLost;

const styles = StyleSheet.create({});
