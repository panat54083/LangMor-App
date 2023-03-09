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

const LostDetail = ({ route, navigation }) => {
    //Configs
    const { lostData } = route.params;
    const { state } = useContext(UserContext);
    //data
    const [chatroomData, setChatroomData] = useState(null);
    //start-up
    useEffect(() => {
        navigation.setOptions({
            title: lostData ? lostData.name : "(ไม่พบชื่อรายการสินค้า)",
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
    useEffect(() => {
        if (chatroomData) {
            navigation.navigate("Chat2", {
                itemData: lostData,
                chatroomData: chatroomData,
            });
        }
    }, [chatroomData]);

    const api_createChatroom = async () => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/create`, {
                customerId: state.userData._id,
                merchantId: lostData.owner_id,
                itemId: lostData._id,
                type: "LostItem",
            })
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatroomData);
                setChatroomData(res.data.chatroomData);
            })
            .catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    console.log("Error", err.response.data.message);
            });
    };

    const handleDebugger = () => {
        console.log(lostData);
    };
    const handleContact = () => {
        api_createChatroom();
        // navigation.navigate("Chat2", { itemData: secondData });
    };
    return (
        <View>
            <Text>LostDetail</Text>
            <Button title="Debugger" onPress={handleDebugger} />
            <SubmitBtn label={"เริ่มแชทกับผู้โพส"} onPress={handleContact} />
        </View>
    );
};

export default LostDetail;

const styles = StyleSheet.create({});
