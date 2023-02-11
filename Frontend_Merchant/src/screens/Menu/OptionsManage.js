//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
//Components
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import AddButton from "../../components/buttons/AddButton";
//Config
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const OptionsManage = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const [options, setOptions] = useState([])

    const handleAddOptions = () => {
        console.log("Add Options");
        navigation.navigate("AddOptions");
    };
    const handleFetchOptions = () => {
        fetchOptions()
    }
    const fetchOptions = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/options?restaurant_id=${state.restaurantData._id}`
            )
            .then((res) => {
                setOptions(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.add_button}>
                <AddButton onPress={handleAddOptions} />
            </View>
            <Button onPress={handleFetchOptions} title="Fetch Options" />
        </SafeAreaView>
    );
};

export default OptionsManage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5f5f5",
    },
    add_button: {
        marginHorizontal: 20,
    },
});
