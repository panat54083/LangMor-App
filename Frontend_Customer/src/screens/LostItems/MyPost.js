//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import AddButton from "../../components/buttons/AddButton";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const MyPost = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);

    //Variables
    const [listLostItems, setListLostItems] = useState([]);

    const api_getMyPosts = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/lostItem/getMyPosts?owner_id=${state.userData._id}`
            )
            .then((res) => {
                console.log(res.data.message);
                setListLostItems(res.data.listLostItems);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddLost = () => {
        navigation.navigate("AddLost");
    };

    const handleDebugger = () => {
        api_getMyPosts();
    };
    return (
        <ScrollView style={styles.scrollView_container}>
            <Button title="Debugger" onPress={handleDebugger} />
            <View style={styles.add_container}>
                <AddButton onPress={handleAddLost} />
            </View>
            {listLostItems.map((item, index) => (
                <Text key={index}>{item.name}</Text>
            ))}
        </ScrollView>
    );
};

export default MyPost;

const styles = StyleSheet.create({
    scrollView_container: {
        flex: 1,
    },
    add_container: {
        marginHorizontal: 15,
    },
});
