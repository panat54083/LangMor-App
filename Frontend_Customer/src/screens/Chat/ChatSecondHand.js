//Packages
import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    RefreshControl,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
} from "react-native";
import Item from "../../components/cards/Item";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { API_URL } from "@env";

const ChatSecondHand = ({ navigation }) => {
    //configs
    const isFocused = useIsFocused();
    const { state } = useContext(UserContext);
    const [refreshing, setRefreshing] = useState(false);
    //data
    const [listOfChatrooms, setListOfChatrooms] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (isFocused) {
            api_getAllChatrooms();
        }
    }, [isFocused]);
    useEffect(() => {
        if (refreshing) {
            api_getAllChatrooms();
        }
    }, [refreshing]);

    const api_getAllChatrooms = () => {
        axios
            .get(
                `${API_URL}/chatroom/chatrooms?customerId=${
                    state.userData._id
                }&&type=${"SecondHand"}&&closed=${false}`
            )
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatrooms)
                setListOfChatrooms(res.data.chatrooms);
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

    const handleDebugger = () => {
        console.log(listOfChatrooms.length);
    };
    return (
        <View style={{flex: 1}}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressBackgroundColor={"white"}
                        colors={["#FF7A00"]}
                    />
                }
            >
                {listOfChatrooms.length !== 0 ? (
                    listOfChatrooms.map((item, index) => (
                        <View style={styles.itemContainer} key={index}>
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
                            alignSelf: "center",
                            flex: 1,
                        }}
                    >
                        <MaterialCommunityIcons
                            name="chat-question"
                            size={100}
                            color="#C9C5C4"
                        />
                        <Text style={styles.font}>คุณยังไม่ได้ทำรายการ</Text>
                        <Text style={styles.font}>ติดต่อของมือสอง</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ChatSecondHand;

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
});
