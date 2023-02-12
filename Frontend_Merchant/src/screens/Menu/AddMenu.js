//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
//Components
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackScreen from "../../components/buttons/BackScreen";
import ImageInput from "../../components/Inputs/ImageInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import CheckboxButton from "../../components/Checkboxes/CheckboxButton";
//Config
import MiniBtn from "../../components/buttons/MiniBtn";
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";
const AddMenu = ({ navigation }) => {
    const { state } = useContext(UserContext);
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

        return fetchOptions();
    }, []);

    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);

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

    const handleSave = () => {
        console.log({
            image: image,
            name: name,
            price: price,
            description: description,
            options: selectOptions,
        });
        console.log("Save");
    };

    const handleSelectOptions = (option) => {
        if (selectOptions.includes(option)) {
            setSelectOptions(selectOptions.filter((o) => o !== option));
        } else {
            setSelectOptions([...selectOptions, option]);
        }
    };
    const handleTestButton = () => {
        console.log("Press")
    }
    return (
        <ScrollView style={{}}>
            <View style={styles.container}>
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
                <Text style={styles.header}>ประเภทอาหาร</Text>
                <View style={styles.options}>
                    <View style={styles.add_edit_button}>
                        <MiniBtn label={"เพิ่ม"} color="#FF7A00" onPress={handleTestButton}/>
                        <MiniBtn label={"แก้ไข"} color="#FF0101" onPress={handleTestButton}/>
                    </View>
                </View>
                <Text style={styles.header}>ตัวเลือกเสริม</Text>
                <View style={styles.options}>
                    {options.map((option, index) => (
                        <CheckboxButton
                            key={index}
                            label={option.name}
                            checked={selectOptions.includes(option)}
                            onPress={() => handleSelectOptions(option)}
                        />
                    ))}
                </View>
                <View style={styles.submitButton}>
                    <AcceptButton label={"บันทึก"} onPress={handleSave} />
                </View>
            </View>
        </ScrollView>
    );
};

export default AddMenu;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        marginHorizontal: 30,
    },
    input_components: {
        marginBottom: 8,
        marginTop: 10,
        alignItems: "center",
    },
    options: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 15,
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
        color: "#1A0700",
        marginBottom: 10,
    },
    add_edit_button: {
        justifyContent: "space-around",
        flexDirection: "row",
    },
    submitButton: {
        marginTop: 20,
    },
});
