//Packages
import React, { useEffect, useState } from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackScreen from "../../components/buttons/BackScreen";
import ImageInput from "../../components/Inputs/ImageInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";

const AddMenu = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "เพิ่มเมนูอาหาร",
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

    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        console.log("Save")
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.input_components}>
                    <View style={{ marginBottom: 8 }}>
                        <ImageInput
                            lable="เพิ่มรูปเมนู"
                            image={image}
                            setImage={setImage}
                        />
                    </View>
                    <CustomTextInput
                        placeholder={"ชื่อรายการอาหาร"}
                        value={name}
                        onChangeText={setName}
                    />
                    <CustomTextInput
                        placeholder={"ราคา (บาท)"}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType={"numeric"}
                    />
                    <CustomTextInput
                        placeholder={"รายละเอียดเพิ่มเติม"}
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <AcceptButton label={"บันทึก"} onPress={handleSave}/>
            </ScrollView>
        </View>
    );
};

export default AddMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        marginTop: 12,
    },
    input_components: {
        marginBottom: 8,
    },
});
