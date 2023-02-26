//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    ScrollView,
} from "react-native";
import AddButton from "../../components/buttons/AddButton";
import ChoiceBtn from "../../components/buttons/ChoiceBtn";
//Config
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const OptionsManage = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const [options, setOptions] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            fetchOptions();
        }
    }, [isFocused]);

    const handleAddOptions = () => {
        // console.log("Add Options");
        navigation.navigate("AddOptions", {optionData: {
            name: "",
            required: false,
            maximum: 0,
            choices: [],
        }});
    };
    const handleEditOption = (option) => {
        // console.log(option);
        navigation.navigate("AddOptions",{optionData: option});
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
                        <ChoiceBtn
                            key={index}
                            label={option.name}
                            onPress={() => handleEditOption(option)}
                        />
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

const options = {
    __v: 0,
    _id: "63f46fcd0ee8a09a910966ac",
    choices: [
        { method: "increase", name: "หวานน้อย", price: 0 },
        { method: "increase", name: "หวานกลาง", price: 0 },
        { method: "increase", name: "หวานมาก", price: 10 },
        { method: "increase", name: "หวานตัดขา", price: 20 },
    ],
    maximum: 1,
    name: "ระดับความหวาน",
    required: true,
    restaurant_id: "63f46de10ee8a09a91096673",
};
