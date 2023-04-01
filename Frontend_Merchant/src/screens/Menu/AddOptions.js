//Packages
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
    Button,
    TouchableOpacity,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import AddOptionsCheck from "../../components/Cards/AddOptionsCheck";
import AddOptionsChoices from "../../components/Cards/AddOptionsChoices";
import Bin from "../../components/buttons/Bin";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { API_URL } from "@env";

const AddOptions = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            title: !optionData._id ? "สร้างตัวเลือกใหม่" : "แก้ไขตัวเลือก",
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
            headerRight: () =>
                optionData._id ? (
                    <Bin onPress={handleDeleteOption} color="#E61931" />
                ) : (
                    ""
                ),
        });
    }, []);

    const { state } = useContext(UserContext);
    const { optionData } = route.params;
    const scrollViewRef = useRef(null);
    const isFocused = useIsFocused();
    const [options_id, setOptions_id] = useState(optionData._id);
    const [name, setName] = useState(optionData.name);
    const [required, setRequired] = useState(optionData.required);
    const [maximum, setMaximum] = useState(optionData.maximum);
    const [choices, setChoices] = useState(optionData.choices);
    const [options, setOptions] = useState({
        name: null,
        required: null,
        maximum: null,
    });
    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [choices]);

    useEffect(() => {
        if (isFocused) {
            // Fetuch Functions
        }
    }, [isFocused]);

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
        if (!name.trim()) {
            Alert.alert("Error", "กรุณาเติมชื่อตัวเลือก");
            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
            return false;
        } else if (options.choices.length < 1) {
            Alert.alert("Error", "กรุณาเพิ่มตัวเลือก");
            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
            return false;
        } else if (options.choices.some((obj) => obj.price === "")) {
            Alert.alert("Error", "กรุณาเติมราคา");
        } else {
            fetchSaveOptions();
            navigation.goBack();
        }

        // // console.log(options)
    };

    const fetchSaveOptions = () => {
        axios
            .post(`${API_URL}/restaurant/save_options`, {
                optionsData: options,
                option_id: options_id,
                restaurant_id: state.restaurantData._id,
            })
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

    const api_deleteOptions = () => {
        axios
            .delete(`${API_URL}/restaurant/delete_option`, {
                data: {
                    option_id: optionData._id,
                    restaurant_id: state.restaurantData._id,
                },
            })
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
    const handleDeleteOption = () => {
        Alert.alert(
            "แจ้งเตือน",
            `ต้องการลบ " ${optionData.name} " ใช่หรือไม่`,
            [
                {
                    text: "ยกเลิก",
                    style: "cancel",
                },
                {
                    text: "ใช่",
                    onPress: () => {
                        api_deleteOptions();
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    const handleDebugger = () => {
        console.log(state.restaurantData);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <ScrollView style={[styles.container]} ref={scrollViewRef}>
                <View style={styles.first_part}>
                    <CustomTextInput
                        placeholder={"ชื่อตัวเลือก"}
                        value={name}
                        onChangeText={setName}
                        required={true}
                    />
                    <View style={{ marginBottom: 4 }}>
                        <AddOptionsCheck
                            requiredCheck={required}
                            getRequired={setRequired}
                            maximumValue={maximum}
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
        marginTop: 10,
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
