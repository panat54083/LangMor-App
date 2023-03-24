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
    TextInput,
    Alert,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import CustomTextInput from "../../components/input/CustomTextInput";
import EditTextInput from "../../components/input/EditTextInput";
import Edit from "../../components/buttons/Edit";
import ImageInput from "../../components/input/ImageInput";

//Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditSecond = ({ navigation, route }) => {
    const { itemData } = route.params;
    const { state } = useContext(UserContext);

    const [name, setName] = useState(itemData.name);
    const [detail, setDetail] = useState(itemData.detail);
    const [price, setPrice] = useState(itemData.price);
    const [image, setImage] = useState(itemData.picture);

    const [isLoaded, setIsLoaded] = useState(false);
    const [editable, setEditable] = useState(true);
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: !editable ? itemData.name : `แก้ไข ${itemData.name}`,
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

    const api_secondHandUpdate = (picture) => {
        axios
            .post(`http://${IP_ADDRESS}/secondHand/update`, {
                item_id: itemData._id,
                updated_data: {
                    name: name,
                    detail: detail,
                    price: price,
                    picture: picture,
                },
            })
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.secondHandData);
            })
            .catch((err) => {
                console.log(err.response.data.message);
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
            if (image.type !== "upload") {
                LIP.handleUpload(image, state.userData._id)
                    .then((data) => {
                        api_secondHandUpdate(data);
                        setIsLoaded(false);
                        navigation.goBack();
                    })
                    .catch((err) => console.log(err));
            } else {
                api_secondHandUpdate(restaurant_picture);
                setIsLoaded(false);
                navigation.goBack();
            }
        } else {
            api_secondHandUpdate(null);
            setIsLoaded(false);
            navigation.goBack();
        }
    };
    const handleDebugger = () => {
        console.log(itemData);
    };
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {/* {/* <Text>EditProfile</Text> */}
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={{ alignItems: "center", margin: "5%" }}>
                <ImageInput image={image} setImage={setImage} />
            </View>

            <View style={styles.textinput}>
                <Text style={styles.font}>
                    ชื่อ<Text style={{ color: "red" }}>*</Text>
                    {"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {itemData.name}
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={name}
                    onChangeText={setName}
                    editable={editable}
                />
                <Text style={styles.font}>
                    ราคา {"(บาท)"}
                    <Text style={{ color: "red" }}>*</Text> {"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {itemData.price} บาท
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={String(price)}
                    onChangeText={setPrice}
                    editable={editable}
                />
                <Text style={styles.font}>
                    รายละเอียด{"  "}
                    {editable
                        ? // <Text style={styles.fontOptions}>
                          //     ปัจจุบัน: {itemData.detail}
                          // </Text>
                          ""
                        : ""}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={String(detail)}
                    onChangeText={setDetail}
                    editable={editable}
                    numberOfLines={5}
                    multiline={true}
                />
            </View>
            {editable ? (
                <View style={styles.submit}>
                    <SubmitBtn
                        label={"บันทึกข้อมูล"}
                        onPress={handleSave}
                        isLoaded={isLoaded}
                    />
                </View>
            ) : null}
        </ScrollView>
    );
};

export default EditSecond;

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
        marginVertical: "5%",
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

const dum_itemData = {
    __v: 0,
    _id: "640d77fb8722829e0942db5e",
    closed: false,
    detail: "รับ ได้ที่หลังมจพ.",
    name: "จานข้าว",
    owner_id: "64084bc09f663ce229c0e44d",
    picture: {
        access_mode: "public",
        asset_id: "7014410a400f0a788f4f861d8992c94f",
        bytes: 951647,
        created_at: "2023-03-12T06:58:01Z",
        etag: "a9abe278e5246a24827ed2ef893d3f93",
        folder: "LangMorApp/64084bc09f663ce229c0e44d",
        format: "png",
        height: 1011,
        placeholder: false,
        public_id: "LangMorApp/64084bc09f663ce229c0e44d/sjyyn0bdsxcvbuwoxgnc",
        resource_type: "image",
        secure_url:
            "https://res.cloudinary.com/dzakkk7rf/image/upload/v1678604281/LangMorApp/64084bc09f663ce229c0e44d/sjyyn0bdsxcvbuwoxgnc.png",
        signature: "de2ccedcd68d8d0ba893319f45f53878bd0cf097",
        tags: [],
        type: "upload",
        url: "http://res.cloudinary.com/dzakkk7rf/image/upload/v1678604281/LangMorApp/64084bc09f663ce229c0e44d/sjyyn0bdsxcvbuwoxgnc.png",
        version: 1678604281,
        version_id: "2cd0307ca2004bd6955e244ef89a5cdd",
        width: 1000,
    },
    price: 100,
};
