//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import ImageView from "react-native-image-viewing";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Image,
    Pressable,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import ItemDetail from "../../components/cards/ItemDetail";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const LostDetail = ({ route, navigation }) => {
    //Configs
    const isFocused = useIsFocused();
    const { lostData, historyChatroomData } = route.params;
    const { state } = useContext(UserContext);
    const [showImage, setShowImage] = useState(false);
    //data
    const [itemData, setItemData] = useState(lostData);
    const [chatroomData, setChatroomData] = useState(null);
    const [ownerData, setOwnerData] = useState({});
    const noImgURL =
        "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
    //start-up
    useEffect(() => {
        navigation.setOptions({
            title: itemData ? itemData.name : "(ไม่พบชื่อรายการสินค้า)",
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
        //API
        if (isFocused) {
            api_getOwnerData();
        }
    }, [isFocused]);
    useEffect(() => {
        if (chatroomData) {
            navigation.navigate("Chat2", {
                itemData: itemData,
                chatroomData: chatroomData,
            });
        }
    }, [chatroomData]);

    const api_createChatroom = async () => {
        axios
            .post(`http://${IP_ADDRESS}/chatroom/create`, {
                customerId: state.userData._id,
                merchantId: itemData.owner_id,
                itemId: itemData._id,
                type: "LostItem",
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

    const api_getOwnerData = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/lostItem/getOwner?owner_id=${itemData.owner_id}&item_id=${itemData._id}`
            )
            .then((res) => {
                setOwnerData(res.data.ownerData);
                setItemData(res.data.lostData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDebugger = () => {
        console.log(itemData);
    };
    const handleContact = () => {
        api_createChatroom();
        // navigation.navigate("Chat2", { itemData: secondData });
    };
    const handleHistoryContact = () => {
        navigation.navigate("Chat2", {
            itemData: itemData,
            chatroomData: historyChatroomData,
        });
    };
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>LostDetail</Text> */}
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.topContatner}>
                <View style={styles.imgFrame1}>
                    <Pressable
                        style={styles.imgFrame2}
                        onPress={() => setShowImage(true)}
                    >
                        <Image
                            source={{
                                uri: itemData.picture
                                    ? `${itemData.picture.url}`
                                    : noImgURL,
                            }}
                            style={styles.imgStyle}
                        />
                        <ImageView
                            images={[
                                {
                                    uri: itemData.picture
                                        ? `${itemData.picture.url}`
                                        : noImgURL,
                                },
                            ]}
                            imageIndex={0}
                            visible={showImage}
                            onRequestClose={() => setShowImage(false)}
                        />
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.detailContainer}>
                    <ItemDetail
                        item={itemData}
                        type={"lostItem"}
                        owner={ownerData}
                    />
                </View>
            </View>
            <View style={styles.submitBtn}>
                {itemData.closed === false && (
                    <SubmitBtn
                        label={"เริ่มแชทกับผู้โพส"}
                        onPress={handleContact}
                    />
                )}
                {itemData.closed === true &&
                    itemData.owner_id !== state.userData._id &&
                    historyChatroomData !== undefined && (
                        <SubmitBtn
                            label={"ตรวจสอบแชท"}
                            onPress={handleHistoryContact}
                        />
                    )}
            </View>
        </View>
    );
};

export default LostDetail;

const styles = StyleSheet.create({
    submitBtn: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        alignSelf: "center",
        marginBottom: "8%",
    },
    topContatner: {
        flex: 0.35,
        backgroundColor: "#FFE8E0",
        alignItems: "center",
        justifyContent: "center",
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
    bottomContainer: {
        flex: 0.65,
        backgroundColor: "white",
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    detailContainer: {
        marginLeft: "6%",
        marginTop: "4%",
        width: "88%",
    },
});
