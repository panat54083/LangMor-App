//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import * as LIP from "../../lib/lm-image-picker";
//Components
import { ScrollView, StyleSheet, Text, View, Button,Alert } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CustomTextInput from "../../components/input/CustomTextInput";
import ImageInput from "../../components/input/ImageInput";
import SubmitBtn from "../../components/buttons/SubmitBtn";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const AddSecond = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "เพิ่มสินค้ามือสอง",
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
    const [price, setPrice] = useState("");
    const [detail, setDetail] = useState("");
    const [image, setImage] = useState(null);

    const api_createSecond = (picture) => {
        axios
            .post(`http://${IP_ADDRESS}/secondHand/create`, {
                name: name,
                detail: detail,
                price: price,
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
        if (!name.trim() || !String(price).trim()) {
            if (!name.trim()) {
                Alert.alert("Error", "กรุณาเติมชื่อสินค้า");
            } else if (!price.trim()) {
                Alert.alert("Error", "กรุณาเติมราคาสินค้า");
            }
            return;
        }
        setIsLoaded(true);
        if (image) {
            LIP.handleUpload(image, state.userData._id)
                .then((data) => {
                    api_createSecond(data);
                    setImage(null);
                    setIsLoaded(false);
                    navigation.navigate("SecondTabs", { screen: "SellSecond" });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api_createSecond(null);
            setIsLoaded(false);
            navigation.navigate("SecondTabs", { screen: "SellSecond" });
        }
    };

    const handleDebugger = () => {};

    return (
        <ScrollView style={{}}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <View style={{ marginBottom: 10 }}>
                        <ImageInput
                            label={"เพิ่มรูปสินค้า"}
                            image={image}
                            setImage={setImage}
                        />
                    </View>
                    <CustomTextInput
                        placeholder={"ชื่อสินค้ามือสอง"}
                        value={name}
                        onChangeText={setName}
                        required={true}
                    />
                    <CustomTextInput
                        placeholder={"ราคา (บาท)"}
                        value={price}
                        onChangeText={setPrice}
                        required={true}
                        keyboardType={"numeric"}
                    />
                    <CustomTextInput
                        placeholder={"รายละเอียดสินค้า"}
                        multiline={true}
                        numberOfLines={5}
                        value={detail}
                        onChangeText={setDetail}
                    />
                </View>
                <View style={styles.submit_container}>
                    <SubmitBtn
                        label={"เพิ่มสินค้า"}
                        onPress={handleSave}
                        isLoaded={isLoaded}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default AddSecond;

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
