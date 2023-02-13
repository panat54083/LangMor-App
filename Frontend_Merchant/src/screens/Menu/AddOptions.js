//Packages
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
//Components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import AddOptionsCheck from "../../components/Cards/AddOptionsCheck";
import AddOptionsChoices from "../../components/Cards/AddOptionsChoices";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const AddOptions = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "สร้างตัวเลือกใหม่",
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

    const { state } = useContext(UserContext);
    const scrollViewRef = useRef(null);
    const [name, setName] = useState("");
    const [required, setRequired] = useState(false);
    const [maximum, setMaximum] = useState(0);
    const [choices, setChoices] = useState([]);
    const [options, setOptions] = useState({
        name: null,
        required: null,
        maximum: null,
    });
    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [choices]);

    useEffect(() => {
        setOptions({
            ...options,
            restaurant_id: state.restaurantData._id,
            name: name,
            maximum: maximum,
            required: required,
            choices: choices,
        });
    }, [name, maximum, required, choices]);
    const handleSave = () => {
        fetchSaveOptions();
        navigation.navigate("MenuTabs", { screen: "OptionsManage" });
    };

    const fetchSaveOptions = () => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/save_options`, options)
            .then((res) => {
                console.log(res.data.message);
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={[styles.container]} ref={scrollViewRef}>
                <View style={styles.first_part}>
                    <CustomTextInput
                        placeholder={"ชื่อตัวเลือก"}
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={{ marginBottom: 4 }}>
                        <AddOptionsCheck
                            getRequired={setRequired}
                            getMaximum={setMaximum}
                        />
                    </View>
                </View>
                <View style={styles.second_part}>
                    <AddOptionsChoices
                        inititalChoices={choices}
                        getChoices={setChoices}
                    />
                </View>
            </ScrollView>
                <View style={styles.third_part}>
                    <AcceptButton label={"บันทึก"} onPress={handleSave} />
                </View>
        </SafeAreaView>
    );
};

export default AddOptions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
    },
    first_part: {
        flex: 1,
    },
    second_part: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 15,
    },
    third_part: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
});
