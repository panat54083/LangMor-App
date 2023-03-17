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

const BuySecond = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listSecondHands, setListSecondHands] = useState([]);
    //Start up
    useEffect(() => {
        if (isFocused) {
            api_getAllSecondHands();
        }
    }, [isFocused]);

    const api_getAllSecondHands = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getAll?owner_id=${state.userData._id}`
            )
            .then((res) => {
                // console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSecondDetail = (data) => {
        // console.log(data)
        navigation.navigate("SecondDetail", { secondData: data });
    };
    return (
        <>
            {/* <Text>BuySecond screen</Text> */}
            {listSecondHands.length !== 0 ? (
                listSecondHands.map((item, index) => (
                    <ScrollView key={index}>
                        <View
                            key={index}
                            style={{
                                marginBottom: "1%",
                                width: "90%",
                                alignSelf: "center",
                            }}
                        >
                            <Item
                                itemData={item}
                                onPress={() => handleSecondDetail(item)}
                                type={"second"}
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
                            color: "#C9C5C4",
                        }}
                    >
                        ไม่พบรายการสินค้า
                    </Text>
                </View>
            )}
        </>
    );
};

export default BuySecond;

const styles = StyleSheet.create({});
