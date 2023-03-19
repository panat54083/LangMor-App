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
//Components
import Item from "../../components/cards/Item";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StateBtn from "../../components/buttons/StateBtn";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const SecondHistory = ({ navigation }) => {
    //Configs
    const isFocused = useIsFocused();
    const [status, setStatus] = useState(true)
    //Variables
    const { state } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (isFocused) {
            if (status){
            api_getAllChatrooms("customerId");
            }else{
            api_getAllChatrooms("merchantId");
            }
        }
    }, [isFocused, status]);

    const api_getAllChatrooms = (role) => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?${role}=${
                    state.userData._id
                }&&type=${"SecondHand"}&&closed=${true}`
            )
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatrooms)
                setOrders(res.data.chatrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChatroom = (data) => {
        navigation.navigate("Chat2", {
            itemData: data.itemData,
            chatroomData: data.chatroom,
        });
    };
    const handleChangeStatus = ()=>{
        setStatus(!status)
    }

    return (
        <View style={{flex: 1,}}>
            <ScrollView style={{flex: 1}}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            {orders.length !== 0 ? (
                orders.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Item
                                itemData={item.itemData}
                                onPress={() => handleChatroom(item)}
                                type={"second"}
                            />
                        </View>
                ))
                ) : (
                    <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        alignSelf: "center",
                        position: "absolute",
                    }}
                    >
                    <MaterialCommunityIcons
                        name="chat-question"
                        size={100}
                        color="#C9C5C4"
                        />
                    <Text style={styles.font}>ไม่พบประวัติ</Text>
                    <Text style={styles.font}>ติดต่อของมือสอง</Text>
                </View>
            )}
            </ScrollView>
            <View style={styles.changeButton}>
            <StateBtn label1={"ฝ่ายซื้อ"} label2={"ฝ่ายขาย"} status={status} onPress={handleChangeStatus}/>

            </View>
        </View>
    );
};

export default SecondHistory;

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: "0.75%",
        marginBottom: "0.25%",
        width: "90%",
        alignSelf: "center",
    },
    font: {
        fontFamily: "Kanit-Bold",
        fontSize: 25,
        color: "#C9C5C4",
    },
    changeButton:{
        position: "absolute",
        width: '100%',
        bottom: "5%",
        left: "68%"
    }

});
