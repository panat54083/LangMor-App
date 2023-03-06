//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//Components
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/input/CustomTextInput";
import ImageInput from "../../components/input/ImageInput";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import RadioButton from "../../components/buttons/RadioButton";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

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
    const [isLoaded, setIsLoaded] = useState(false);
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

    const createLost = (picture) => {
        axios
            .post(`http://${IP_ADDRESS}/lostItem/create`, {
                name: name,
                detail: detail,
                type: selectedType,
                picture: picture,
                owner_id: state.userData._id,
                closed: false,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = () => {
        setIsLoaded(true);
        if (image) {
            LIP.handleUpload(image, state.userData._id)
                .then((data) => {
                    createLost(data);
                    setImage(null);
                    setIsLoaded(false);
                    navigation.navigate("LostTabs", { screen: "MyPost" });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            createLost(null);
            setIsLoaded(false);
            navigation.navigate("LostTabs", { screen: "MyPost" });
        }
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
                    placeholder={
                        "รายละเอียดของหาย\n- สถานที่ที่คาดว่าทำหาย\n- เวลาที่ทำหาย"
                    }
                    multiline={true}
                    numberOfLines={5}
                    value={detail}
                    onChangeText={setDetail}
                />
            </View>
            <View style={styles.submit_container}>
                <SubmitBtn
                    label={"เพิ่มของหาย"}
                    onPress={handleSave}
                    isLoaded={isLoaded}
                />
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
