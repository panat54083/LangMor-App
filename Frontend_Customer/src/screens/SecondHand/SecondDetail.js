//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Image,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import ItemDetail from "../../components/cards/ItemDetail";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const SecondDetail = ({ route, navigation }) => {
    //Config
    const { secondData } = route.params;
    const noImgURL =
        "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
    const { state } = useContext(UserContext);
    //data
    const [chatroomData, setChatroomData] = useState(null);
    //start-up
    useEffect(() => {
        navigation.setOptions({
            title: secondData ? secondData.name : "(ไม่พบชื่อรายการสินค้า)",
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
    useEffect(() => {
        if (chatroomData) {
            navigation.navigate("Chat2", {
                itemData: secondData,
                chatroomData: chatroomData,
            });
        }
    }, [chatroomData]);

    const api_createChatroom = async () => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/create`, {
                customerId: state.userData._id,
                merchantId: secondData.owner_id,
                itemId: secondData._id,
                type: "SecondHand",
            })
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.chatroomData);
                setChatroomData(res.data.chatroomData);
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
        console.log(secondData);
    };

    const handleContact = () => {
        api_createChatroom();
        // navigation.navigate("Chat2", { itemData: secondData });
    };
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>SecondDetail</Text> */}
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.topContatner}>
                <View style={styles.imgFrame1}>
                    <View style={styles.imgFrame2}>
                        <Image
                            source={{
                                uri: secondData.picture
                                    ? `${secondData.picture.url}`
                                    : noImgURL,
                            }}
                            style={styles.imgStyle}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.detailContainer}>
                    <ItemDetail item={secondData} type={"second"} />
                </View>
            </View>
            <View style={styles.submitBtn}>
                <SubmitBtn
                    label={"เริ่มแชทกับผู้ขาย"}
                    onPress={handleContact}
                />
            </View>
        </View>
    );
};

export default SecondDetail;

const styles = StyleSheet.create({
    topContatner: {
        flex: 0.35,
        backgroundColor: "#FFE8E0",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flex: 0.65,
        backgroundColor: "white",
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    imgFrame1: {
        backgroundColor: "white",
        maxWidth: "90%",
        maxHeight: "90%",
        paddingHorizontal: "2%",
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    imgFrame2: {
        width: "92%",
        height: "92%",
        borderRadius: 10,
        alignSelf: "center",
    },
    imgStyle: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        alignSelf: "center",
        aspectRatio: 1,
    },
    detailContainer: {
        marginLeft: "6%",
        marginTop: "4%",
        width: "88%",
    },
    submitBtn: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        alignSelf: "center",
        marginBottom: "8%",
    },
});
