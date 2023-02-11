//Packages
import React, { useContext, useEffect, useState } from "react";
//Components
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import AddOptionsCheck from "../../components/Cards/AddOptionsCheck";
import AddOptionsChoices from "../../components/Cards/AddOptionsChoices";
//Configs
import UserContext from "../../hooks/context/UserContext";

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
    const [name, setName] = useState("");
    const [required, setRequired] = useState(false);
    const [maximum, setMaximum] = useState(0);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState({
        name: null,
        required: null,
        maximum: null,
    });

    useEffect(() => {
        setData({
            ...data,
            restaurant_id: state.restaurantData._id,
            name: name,
            maximum: maximum,
            required: required,
            options: options,
        });
    }, [name, maximum, required, options]);
    const handleSave = () => {
        console.log(data);
        console.log("Save");
    };
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
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
                    <AddOptionsChoices getOptions={setOptions} />
                </View>
                <View style={styles.submit_button}>
                    <AcceptButton label={"บันทึก"} onPress={handleSave} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default AddOptions;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    first_part: {
        // backgroundColor: "blue",
    },
    second_part: {},
    submit_button: {
        // position: "absolute",
        // bottom: 0,
    },
});
