//Packages
import React, { useEffect, useState, useContext } from "react";
//Components
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/input/CustomTextInput";
import ImageInput from "../../components/input/ImageInput";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import RadioButton from "../../components/buttons/RadioButton";
//Configs
import UserContext from "../../hooks/context/UserContext";

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

    // Configs
    const { state } = useContext(UserContext);

    // Variables
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [selectedType, setSelectedType] = useState("find");
    const [image, setImage] = useState(null);
    const types = [
        { name: "ตามหาของหาย", value: "find" },
        { name: "พบของหาย", value: "found" },
    ];

    const handleSelectedTypes = (item) => {
        if (selectedType === item) {
            // setSelectedType("");
        } else {
            setSelectedType(item);
        }
    };
    const handleSave = () => {
        console.log("Save");
        console.log({
            name: name,
            detail: detail,
            type: selectedType,
            picture: image,
            owner_id: state.userData._id,
            closed: false,
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.input_container}>
                <View style={{ marginBottom: 10 }}>
                    <ImageInput
                        label={"เพิ่มรูปของหาย"}
                        image={image}
                        setImage={setImage}
                    />
                </View>
                <View style={styles.radio_container}>
                    {types.map((item, index) => (
                        <RadioButton
                            key={index}
                            label={item.name}
                            backgroundColor={null}
                            fontFamily={"Kanit-Medium"}
                            selected={selectedType === item.value}
                            onPress={() => handleSelectedTypes(item.value)}
                        />
                    ))}
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
    );
};

export default AddLost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    radio_container: {
        flexDirection: "row",
    },
    input_container: {
        marginTop: 10,
        marginHorizontal: 30,
        alignItems: "center",
        flex: 1,
    },
    submit_container: {
        width: "89.33%",
        position: "absolute",
        alignSelf: "center",
        bottom: 20,
    },
});
