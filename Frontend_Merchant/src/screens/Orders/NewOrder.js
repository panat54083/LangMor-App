//Packages
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//Components
import { Button, StyleSheet, Text, View } from "react-native";
import OrderCard from "../../components/Cards/OrderCard";
//Config
import SocketContext from "../../hooks/context/SocketContext";
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const NewOrder = () => {
    const { state } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const [chatrooms, setChatrooms] = useState([]);

    useEffect(() => {
        fetchChatrooms();
    }, []);
    const fetchChatrooms = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/chatroom/chatrooms?restaurantId=${state.restaurantData._id}`
            )
            .then((res) => {
                // console.log(res.data.message);
                setChatrooms(res.data.chatrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDebugger = () => {
        console.log(chatrooms)
    }
    return (
        <View>
            <Button title="Debugger" onPress={handleDebugger}/>
            {chatrooms.map((room, index) => (
                <OrderCard key={index} onPress={() => console.log(room.customer)} name={room.customer.name}/>
            ))}
        </View>
    );
};

export default NewOrder;

const styles = StyleSheet.create({});
