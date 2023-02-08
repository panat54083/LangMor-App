//Components
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
//Packages
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import AddOptionsCheck from "../../components/Cards/AddOptionsCheck";
import AddOptionsChoices from "../../components/Cards/AddOptionsChoices";

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

    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);

    const handleSave = () => {
        console.log({ name: name, number: number });
        console.log("Save");
    };
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.first_part}>
                    <CustomTextInput
                        placeholder={"ชื่อตัวลือก"}
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={{ marginBottom: 4 }}>
                        <AddOptionsCheck
                            number={number}
                            setNumber={setNumber}
                        />
                    </View>
                </View>
                <View style={styles.second_part}>
                    <AddOptionsChoices />
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
