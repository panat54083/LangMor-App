//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from "react-native";
import AddButton from "../../components/buttons/AddButton";
import ChoiceBtn from "../../components/buttons/ChoiceBtn";
//Config
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const OptionsManage = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const [options, setOptions] = useState([]);
    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            fetchOptions()
        }
    }, [isFocused])

    const handleAddOptions = () => {
        console.log("Add Options");
        navigation.navigate("AddOptions");
    };
    const handleFetchOptions = () => {
        console.log("Press")
    };
    const fetchOptions = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/options?restaurant_id=${state.restaurantData._id}`
            )
            .then((res) => {
                setOptions(res.data.options);
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
                <ScrollView>
            <View style={styles.Options}>

                {options.map((option, index) => (
                    <ChoiceBtn key={index} option={option} />
                ))}
            </View>
                </ScrollView>
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
    Options: {
        marginHorizontal: 20,
    },
});
