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
//Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const Report = ({ navigation }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const { state } = useContext(UserContext);
    //Start-up
    useEffect(() => {
        navigation.setOptions({
            title: "รายงานปัญหา",
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

    const api_sendEmail = async () => {
        return await axios
            .post(`http://${IP_ADDRESS}/setting/sendReport`, {
                subject: subject,
                message: message,
                sender: state.userData.email,
                app: "Merchant",
            })
            .then((res) => {
                console.log(res.data.message);
                return res.data.success;
            })
            .catch((err) => {
                console.log(err); // add this line to see more details about the error
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    console.log("Error", err.response.data.message);
                }

                return res.data.success;
            });
    };
    const handleSendEmail = () => {
        setIsLoaded(true);
        api_sendEmail().then((s) => {
            if (s) {
                Alert.alert("Success", "ส่งรายงานเรียบร้อยแล้ว");
                setMessage("");
                setSubject("");
            } else {
                Alert.alert("Error", "พบปัญหาการส่งรายงาน");
            }
            setIsLoaded(false);
        });
    };
    const handleDebugger = () => {
        console.log(state.userData);
    };
    return (
        <View style={{ marginTop: 20, flex: 1 }}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}

            <View style={styles.textinput}>
                <Text style={styles.header}>หัวข้อเรื่อง</Text>
                <CustomTextInput
                    placeholder={"กรอกรายละเอียด"}
                    value={subject}
                    onChangeText={setSubject}
                />

                <Text style={styles.header}>รายละเอียด</Text>
                <CustomTextInput
                    placeholder={"กรอกรายละเอียด"}
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>
            <View style={styles.submit}>
                <SubmitBtn
                    label="ส่งรายงาน"
                    onPress={handleSendEmail}
                    isLoaded={isLoaded}
                />
            </View>
        </View>
    );
};

export default Report;

const styles = StyleSheet.create({
    textinput: {
        marginHorizontal: 30,
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
        marginBottom: 4,
    },
    submit: {
        flex: 1,
        justifyContent: "flex-end",
        marginHorizontal: 20,
        marginBottom: "5%",
    },
});
