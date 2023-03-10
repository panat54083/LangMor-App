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
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const Report = ({ navigation }) => {
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

    const sendEmail = () => {
        axios
            .post(`http://${IP_ADDRESS}/setting/sendReport`, {
                subject: subject,
                message: message,
                sender: state.userData.email,
                app: "Merchant",
            })
            .then((res) => {
                // console.log(res.data.message);
            })
            .catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    console.log("Error", err.response.data.message);
            });
    };
    const handleDebugger = () => {
        console.log(state.userData)
    }
    return (
        <View>
            <Text>Report</Text>

            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <Button title="Send Report" onPress={sendEmail} />
        </View>
    );
};

export default Report;

const styles = StyleSheet.create({});
