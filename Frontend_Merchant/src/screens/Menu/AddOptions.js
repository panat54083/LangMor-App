//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
//Packages
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import AddOptionsCheck from "../../components/Checkboxes/AddOptionsCheck";

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
    const [number, setNumber ] = useState(0)

    const handleSave = () => {
        console.log({name: name, number: number})
        console.log("Save")
    }
    return (
        <View style={styles.container}>
            <CustomTextInput
                placeholder={"ชื่อตัวลือก"}
                value={name}
                onChangeText={setName}
            />
            <View style={{marginBottom : 10}}>

            <AddOptionsCheck number={number} setNumber={setNumber}/>
            </View>
            <AcceptButton label={"บันทึก"} onPress={handleSave}/>
        </View>
    );
};

export default AddOptions;

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        marginHorizontal:20,
    }
    
});
