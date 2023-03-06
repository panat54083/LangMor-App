//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import AddButton from "../../components/buttons/AddButton";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const SellSecond = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);

    //Variables
    const [listSecondHands, setListSecondHands] = useState([]);

    const api_getMyPosts= () => {
        axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getMyPosts?owner_id=${state.userData._id}`
            )
            .then((res) => {
                console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddSecond = () => {
        navigation.navigate("AddSecond");
    };

    const handleDebugger = () => {
        api_getMyPosts();
    };

    return (
        <ScrollView style={styles.scrollView_container}>
            <Button title="Debugger" onPress={handleDebugger} />
            <View style={styles.add_container}>
                <AddButton onPress={handleAddSecond} />
            </View>
            {listSecondHands.map((item, index) => (
                <Text key={index}>{item.name}</Text>
            ))}
        </ScrollView>
    );
};

export default SellSecond;

const styles = StyleSheet.create({
    scrollView_container: {
        flex: 1,
    },
    add_container: {
        marginHorizontal: 15,
    },
});
