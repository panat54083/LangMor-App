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
    TextInput,
    Alert,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import EditTextInput from "../../components/input/EditTextInput";
import ImageInput from "../../components/input/ImageInput";

//Configs
import { API_URL } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditPost = ({ navigation, route }) => {
    const { itemData } = route.params;
    const { state } = useContext(UserContext);

    const [name, setName] = useState(itemData.name);
    const [detail, setDetail] = useState(itemData.detail);
    const [image, setImage] = useState(itemData.picture);

    const [isLoaded, setIsLoaded] = useState(false);
    const [editable, setEditable] = useState(
        itemData.closed !== true ? true : false
    );

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
            // headerRight: () => (
            //     <View>
            //         {!editable ? (
            //             <Edit
            //                 onPress={() => setEditable(true)}
            //                 color={"#E61931"}
            //             />
            //         ) : null}
            //     </View>
            // ),
        });
    }, [editable]);

    const api_LostItemUpdate = (picture) => {
        axios
            .post(`${API_URL}/lostItem/update`, {
                item_id: itemData._id,
                updated_data: {
                    name: name,
                    detail: detail,
                    picture: picture,
                },
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };
    const handleSave = () => {
        if (!name.trim() || !String(detail).trim()) {
            if (!name.trim()) {
                Alert.alert("Error", "กรุณาเติมชื่อโพส");
            } else if (!detail.trim()) {
                Alert.alert("Error", "กรุณาเติมรายละเอียด");
            }
            return;
        }
        setIsLoaded(true);
        if (image) {
            if (image.type !== "upload") {
                LIP.handleUpload(image, state.userData._id)
                    .then((data) => {
                        api_LostItemUpdate(data);
                        setIsLoaded(false);
                        navigation.goBack();
                    })
                    .catch((err) => console.log(err));
            } else {
                api_LostItemUpdate(restaurant_picture);
                setIsLoaded(false);
                navigation.goBack();
            }
        } else {
            api_LostItemUpdate(null);
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
                    รายละเอียด<Text style={{ color: "red" }}>*</Text>
                    {"  "}
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

export default EditPost;

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
