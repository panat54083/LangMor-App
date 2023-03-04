//Packages
import React, { useEffect, useState } from "react";
//Components
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/input/CustomTextInput";
import ImageInput from "../../components/input/ImageInput";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import RadioButton from "../../components/buttons/RadioButton";

const AddLost = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "เพิ่มโพสของหาย",
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
    const [detail, setDetail] = useState("");
    const [image, setImage] = useState(null);

    const handleSave = () => {
        console.log("Save");
    };
    return (
             <ScrollView style={{}}>
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <View style={{ marginBottom: 10 }}>
                        <ImageInput
                            label={"เพิ่มรูปของหาย"}
                            image={image}
                            setImage={setImage}
                        />
                    </View>
                    <View>
                    <RadioButton label={"eiei"}/>
                    </View>
                    <CustomTextInput
                        placeholder={"ชื่อของหาย"}
                        value={name}
                        onChangeText={setName}
                    />
                    <CustomTextInput
                        placeholder={"รายละเอียดของหาย"}
                        multiline={true}
                        numberOfLines={5}
                        value={detail}
                        onChangeText={setDetail}
                    />
                </View>
                <View style={styles.submit_container}>
                    <SubmitBtn label={"เพิ่ม"} onPress={handleSave} />
                </View>
            </View>
        </ScrollView>
    );
};

export default AddLost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input_container: {
        marginTop: 10,
        marginHorizontal: 30,
        alignItems: "center",
        flex: 1,
    },
    submit_container: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 20,
    },
});