// Packages
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
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

//Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditPost = ({ navigation, route }) => {
    const { itemData } = route.params;

    const [name, setName] = useState(itemData.name);
    const [detail, setDetail] = useState(itemData.detail);
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

    const api_LostItemUpdate = () => {
        axios
            .post(`http://${IP_ADDRESS}/lostItem/update`, {
                item_id: itemData._id,
                updated_data: {
                    name: name,
                    detail: detail,
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
        api_LostItemUpdate();
        navigation.goBack();
    };
    const handleDebugger = () => {
        console.log(itemData);
    };
    return (
        <View style={styles.container}>
            {/* {/* <Text>EditProfile</Text> */}
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}

            <View style={styles.textinput}>
                <Text style={styles.font}>
                    ชื่อ{"  "}
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
                    <SubmitBtn label={"บันทึกข้อมูล"} onPress={handleSave} />
                </View>
            ) : null}
        </View>
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
