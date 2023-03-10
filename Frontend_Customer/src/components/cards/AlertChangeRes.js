import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../hooks/context/BasketContext";
const AlertChangeRes = (props) => {
    const { modalVisible, toggleModalVisible, handleOnPressSubmit } = props;
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    const [userConfirm, setUserConfirm] = useState(false);
    const OnConfirm = () => {
        toggleModalVisible();
        setBasketDetail({ restaurant: null, foods: [] });
        setUserConfirm(true);
    };
    useEffect(() => {
        if (userConfirm) {
            handleOnPressSubmit();
        }
    }, [userConfirm]);
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            nRequestClose={() => {}}
        >
            <TouchableOpacity
                onPress={() => {
                    toggleModalVisible();
                }}
                activeOpacity={1}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}
            ></TouchableOpacity>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        width: "95%",
                        borderRadius: 15,
                    }}
                >
                    <View
                        style={{
                            // backgroundColor: "white",
                            width: "95%",
                            alignSelf: "center",
                            paddingVertical: "4%",
                        }}
                    >
                        <View style={{ marginBottom: "2.5%" }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    marginBottom: "1%",
                                }}
                            >
                                คุณต้องการจะเปลี่ยนร้านเหรอ ?
                            </Text>
                            <Text style={{ textAlign: "center" }}>
                                เราจัดให้ได้ทันทีเลย แต่ต้องลบรายการอาหาร{"\n"}
                                ที่คุณสั่งไว้ตอนนี้ก่อนนะ
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => OnConfirm()}
                            style={{
                                backgroundColor: "#FF7A00",
                                width: "90%",
                                alignSelf: "center",
                                borderRadius: 10,
                                marginBottom: "2.5%",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    paddingVertical: "2%",
                                    color: "white",
                                }}
                            >
                                ตกลง
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => toggleModalVisible()}
                            style={{
                                backgroundColor: "white",
                                width: "90%",
                                alignSelf: "center",
                                borderRadius: 10,
                                borderWidth: 1,
                                marginBottom: "2.5%",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    paddingVertical: "2%",
                                }}
                            >
                                ยกเลิก
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AlertChangeRes;

const styles = StyleSheet.create({});
