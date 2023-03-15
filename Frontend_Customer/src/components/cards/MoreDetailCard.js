import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Number from "../input/Number";
const MoreDetailCard = (props) => {
    const { number, setNumber, moreDetail, setMoreDetail, minNumber } = props;
    const handleChange = (text) => {
        setMoreDetail(text);
    };
    return (
        <View style={{ backgroundColor: "#FFFFFF" }}>
            <View style={{ marginLeft: "6%", marginVertical: 14 }}>
                <Text style={{ fontFamily: "Kanit-Bold", fontSize: 16 }}>
                    รายละเอียดเพิ่มเติม
                </Text>
            </View>
            <TextInput
                placeholder="กรอกรายละเอียด"
                value={moreDetail}
                onChangeText={handleChange}
                style={{
                    height: 50,
                    width: "77.6%",
                    alignSelf: "center",
                    borderColor: "black",
                    borderWidth: 0.5,
                    paddingHorizontal: 10,
                    marginBottom: 20,
                    fontFamily: "Kanit-SemiBold",
                }}
            />
            <View>
                <Number number={number} setNumber={setNumber} minNumber={minNumber} />
            </View>
        </View>
    );
};

export default MoreDetailCard;

const styles = StyleSheet.create({});
