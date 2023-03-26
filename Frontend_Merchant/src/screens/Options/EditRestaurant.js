// Packages
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import * as LIP from "../../lib/lm-image-picker";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    SectionList,
    Alert,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import AcceptButton from "../../components/buttons/AcceptButton";
import EditTextInput from "../../components/Inputs/EditTextInput";
import Edit from "../../components/buttons/Edit";
import ImageInput from "../../components/Inputs/ImageInput";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditRestaurant = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
    const [editable, setEditable] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurant_name, setRestaurant_name] = useState(
        state.restaurantData.name
    );
    const [restaurant_address, setRestaurant_address] = useState(
        state.restaurantData.address
    );
    const [restaurant_phone, setRestaurant_phone] = useState(
        state.restaurantData.phone
    );
    const [restaurant_picture, setRestaurant_picture] = useState(
        state.restaurantData.picture
    );
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: !editable ? "ข้อมูลร้านค้า" : "แก้ไขข้อมูลร้านค้า",
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
            headerRight: () => (
                <View>
                    {!editable ? (
                        <Edit
                            onPress={() => setEditable(true)}
                            color={"#E61931"}
                        />
                    ) : null}
                </View>
            ),
        });
    }, [editable]);

    const api_restaurantUpdate = (image) => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/updated`, {
                restaurant_id: state.restaurantData._id,
                updated_data: {
                    name: restaurant_name,
                    phone: restaurant_phone,
                    address: restaurant_address,
                    picture: image,
                },
            })
            .then((res) => {
                console.log(res.data.message);
                console.log(res.data.restaurantData);
                onAction.updateRestaurantData({
                    restaurant: res.data.restaurantData,
                });
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };
    const handleDebugger = () => {
        console.log(state.restaurantData.picture);
    };
    const handleSave = () => {
        if (!restaurant_name.trim()) {
            Alert.alert("Error", "กรุณาเติมชื่อร้านค้า");
            return;
        }
        setIsLoaded(true);
        if (restaurant_picture) {
            if (restaurant_picture.type !== "upload") {
                LIP.handleUpload(restaurant_picture, state.restaurantData._id)
                    .then((data) => {
                        api_restaurantUpdate(data);
                        setIsLoaded(false);
                        navigation.navigate("Setting");
                    })
                    .catch((err) => console.log(err));
            } else {
                api_restaurantUpdate(restaurant_picture);
                setIsLoaded(false);
                navigation.navigate("Setting");
            }
        } else {
            api_restaurantUpdate(null);
            setIsLoaded(false);
            navigation.navigate("Setting");
        }
    };
    return (
        <ScrollView style={styles.container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2%",
                }}
            >
                <ImageInput
                    image={restaurant_picture}
                    setImage={setRestaurant_picture}
                    disable={!editable}
                />
            </View>
            <View style={styles.textinput}>
                <Text style={styles.font}>
                    ชื่อร้านค้า<Text style={{ color: "red" }}>*</Text>
                    {"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {state.restaurantData.name}
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={restaurant_name}
                    onChangeText={setRestaurant_name}
                    editable={editable}
                />
                <Text style={styles.font}>
                    ที่อยู่{"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {state.restaurantData.address}
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={restaurant_address}
                    onChangeText={setRestaurant_address}
                    editable={editable}
                    multiline={true}
                />
                <Text style={styles.font}>
                    เบอร์โทรศัพท์{"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {state.restaurantData.phone}
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={restaurant_phone}
                    onChangeText={setRestaurant_phone}
                    editable={editable}
                />
            </View>
            {editable ? (
                <View style={styles.submit}>
                    <AcceptButton label={"บันทึกข้อมูล"} onPress={handleSave} isLoaded={isLoaded}/>
                </View>
            ) : null}
        </ScrollView>
    );
};

export default EditRestaurant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textinput: {
        marginTop: "2%",
        marginHorizontal: "5%",
    },
    submit: {
        flex: 1,
        justifyContent: "flex-end",
        marginHorizontal: 20,
        marginBottom: "10%",
    },
    font: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
    },
    fontOptions: {
        fontFamily: "Kanit-Medium",
        fontSize: 14,
        color: "#FF7A00",
    },
});

const dum_restaurantData = {
    __v: 4,
    _id: "63f46de10ee8a09a91096673",
    address: "หน้าวัดน้อย",
    closed: false,
    createdAt: "2023-02-21T07:08:17.445Z",
    name: "ร้านส้มตำแอบเแซ่บ",
    owner: "63f46dc50ee8a09a91096670",
    phone: "0987654321",
    picture: {
        access_mode: "public",
        asset_id: "fc8b8d759a7928f92fc9a7023036a9ed",
        bytes: 222543,
        created_at: "2023-02-21T07:09:06Z",
        etag: "bd0af6f3ba7f15a962136a7002a40cec",
        folder: "LangMorApp/63f46de10ee8a09a91096673",
        format: "jpg",
        height: 667,
        placeholder: false,
        public_id: "LangMorApp/63f46de10ee8a09a91096673/be5x1jmkt3gjezhg61jy",
        resource_type: "image",
        secure_url:
            "https://res.cloudinary.com/dzakkk7rf/image/upload/v1676963346/LangMorApp/63f46de10ee8a09a91096673/be5x1jmkt3gjezhg61jy.jpg",
        signature: "8d246e8e20be381604d855bdf238a4b734ffbcbd",
        tags: [],
        type: "upload",
        url: "http://res.cloudinary.com/dzakkk7rf/image/upload/v1676963346/LangMorApp/63f46de10ee8a09a91096673/be5x1jmkt3gjezhg61jy.jpg",
        version: 1676963346,
        version_id: "fe9dcea6062fe60942fd8dedc8919662",
        width: 1000,
    },
    types: ["อาหารคาว", "เครื่องดื่ม", "ผลไม้", "ของทานเล่น"],
    updatedAt: "2023-03-11T18:37:25.169Z",
    worker: [],
};
