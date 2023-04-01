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
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import CustomTextInput from "../../components/input/CustomTextInput";
import EditTextInput from "../../components/input/EditTextInput";
import Edit from "../../components/buttons/Edit";

//Configs
import { API_URL } from "@env";
import UserContext from "../../hooks/context/UserContext";

const EditProfile = ({ navigation }) => {
    const { state, onAction } = useContext(UserContext);
    const [family_name, setFamily_name] = useState(state.userData.family_name);
    const [given_name, setGiven_name] = useState(state.userData.given_name);
    const [editable, setEditable] = useState(false);
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: !editable ? "โปรไฟล์" : "แก้ไขโปรไฟล์",
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

    const api_userUpdate = () => {
        axios
            .post(`${API_URL}/customer/update`, {
                _id: state.userData._id,
                family_name: family_name,
                given_name: given_name,
            })
            .then((res) => {
                console.log(res.data.message);
                onAction.updateUserData({
                    user: res.data.userData,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDebugger = () => {
        // console.log(state.userData);
        // api_userUpdate();
    };
    const handleSave = () => {
        // console.log(state.userData);
        api_userUpdate();
        navigation.navigate("TapStackRoutes", { screen: "Profile" });
    };

    return (
        <View style={styles.container}>
            {/* <Text>EditProfile</Text>
            <Button title="Debugger" onPress={handleDebugger} /> */}

            <View style={styles.textinput}>
                <Text style={styles.font}>
                    ชื่อ<Text style={{color: "red"}}>*</Text>{"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {state.userData.given_name}
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={given_name}
                    onChangeText={setGiven_name}
                    editable={editable}
                />
                <Text style={styles.font}>
                    นามสกุล<Text style={{color: "red"}}>*</Text>{"  "}
                    {editable ? (
                        <Text style={styles.fontOptions}>
                            ปัจจุบัน: {state.userData.family_name}
                        </Text>
                    ) : (
                        ""
                    )}
                </Text>
                <EditTextInput
                    placeholder={"กรอกข้อมูล"}
                    value={family_name}
                    onChangeText={setFamily_name}
                    editable={editable}
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

export default EditProfile;

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

const dum_userData = {
    __v: 0,
    _id: "63f46d5f0ee8a09a91096666",
    address: "",
    createdAt: "2023-02-21T07:06:07.150Z",
    email: "panat54083@gmail.com",
    family_name: "Pine",
    given_name: "Dipper",
    name: "Dipper Pine",
    picture:
        "https://lh3.googleusercontent.com/a/AEdFTp4gf41HTmLLKrbABIMKNYeOSu7ve6xSm8S-n9uK0w=s96-c",
    updatedAt: "2023-02-21T07:06:07.150Z",
    verified_email: true,
};
