//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import Item from "../../components/cards/Item";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const InformLost = ({ navigation }) => {
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
            .get(
                `http://${IP_ADDRESS}/lostItem/getAll?type=${"found"}&owner_id=${
                    state.userData._id
                }`
            )
            .then((res) => {
                console.log(res.data.message);
                setListOfLostItems(res.data.listOfLostItems);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleInformLostDetail = (data) => {
        // console.log(data);
        navigation.navigate("LostDetail", { lostData: data });
    };
    return (
        <>
        {/* <Text>InformLost screen</Text> */}
            {listOfLostItems.length !== 0 ? (
                listOfLostItems.map((item, index) => (
                    <ScrollView key={index}>
                    <View
                        style={{
                            marginBottom: 5,
                            width: "90%",
                            alignSelf: "center",
                        }}
                    >
                        <Item
                            itemData={item}
                            onPress={() => {
                                handleInformLostDetail(item);
                            }}
                            type={"lost"}
                        />
                    </View>
                </ScrollView>
                ))
            ) : (
                <View
                  style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                <Text
                    style={{
                        fontFamily: "Kanit-Bold",
                        fontSize: 22,
                        textAlign: "center",
                        color:"#C9C5C4"
                    }}
                >
                    ไม่มีรายการแจ้งของหาย
                </Text>

                </View>
            )}

        </>
    );
};

export default InformLost;

const styles = StyleSheet.create({});
