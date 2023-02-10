import React, { useEffect, useState } from "react";
//components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CheckboxButton from "../Checkboxes/CheckboxButton";
import Number from "../Inputs/Number";
const AddOptionsCheck = ({ getRequired, getMaximum }) => {
    const [checked1, setChecked1] = useState(false);
    const [maximum, setMaximum] = useState(1);

    useEffect(() => {
        getMaximum(maximum);
        getRequired(checked1);
    }, [maximum, checked1]);
    return (
        <View style={styles.container}>
            <CheckboxButton
                label="ลูกค้าจำเป็นต้องเลือก"
                checked={checked1}
                onPress={() => {
                    setChecked1(!checked1);
                }}
            />
            <View style={[styles.row, {marginTop: 4}]}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.text}>เลือกได้สูงสุด</Text>
                </View>
                <View style={{ flex: 2, alignItems: "center" }}>
                    <Number getNumber={setMaximum} />
                </View>
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 4,
                }}
            >
                {maximum === 0 ? (
                    <Text
                        style={[
                            styles.text,
                            {
                                color: "#FF4200",
                            },
                        ]}
                    >
                        ลูกค้าสามารถเลือกได้ทั้งหมด
                    </Text>
                ) : (
                    ""
                )}
            </View>
        </View>
    );
};

export default AddOptionsCheck;

const styles = StyleSheet.create({
    container: { backgroundColor: "white", borderRadius: 15, padding:4},
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
    },
    text: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 14,
        color: "#9D9693",
        // flex: 1,
        // backgroundColor: "red",
    },
});
