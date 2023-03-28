//Packages
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import axios from "axios";
import ImageView from "react-native-image-viewing";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Pressable,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import ItemDetail from "../../components/cards/ItemDetail";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { API_URL } from "@env";

const SecondDetail = ({ route, navigation }) => {
    //Config
    const isFocused = useIsFocused();
    const { secondData, historyChatroomData } = route.params;
    const { state } = useContext(UserContext);
    const [showImage, setShowImage] = useState(false);
    //data
    const [itemData, setItemData] = useState(secondData);
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
        // API
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
            .post(`${API_URL}/chatroom/create`, {
                customerId: state.userData._id,
                merchantId: itemData.owner_id,
                itemId: itemData._id,
                type: "SecondHand",
            })
            .then((res) => {
                console.log(res.data.message);
                console.log(res.data.chatroomData);
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
                `${API_URL}/secondHand/getOwner?owner_id=${itemData.owner_id}&item_id=${itemData._id}`
            )
            .then((res) => {
                setOwnerData(res.data.ownerData);
                setItemData(res.data.secondData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDebugger = () => {
        console.log(historyChatroomData);
    };

    const handleContact = () => {
        api_createChatroom();
    };

    const handleHistoryContact = () => {
        navigation.navigate("Chat2", {
            itemData: itemData,
            chatroomData: historyChatroomData,
        });
    };
    return (
        <View style={{ flex: 1 }}>
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
                        owner={ownerData}
                        type={"second"}
                    />
                </View>
            </View>
            <View style={styles.submitBtn}>
                {itemData.closed === false && (
                    <SubmitBtn
                        label={"เริ่มแชทกับผู้ขาย"}
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

const dum_secondData = {
    __v: 0,
    _id: "64097be40fddd7ecc55fd3fc",
    closed: false,
    detail: "",
    name: "etet",
    owner_id: "64084bc09f663ce229c0e44d",
    picture: null,
    price: 123,
};
