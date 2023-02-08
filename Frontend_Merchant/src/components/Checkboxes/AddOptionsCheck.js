import React from "react";
//conponents
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CheckboxButton from "./CheckboxButton";
import Number from "../Inputs/Number";
const AddOptionsCheck = ({ number, setNumber }) => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    return (
        <View style={styles.container}>
                    <CheckboxButton
                        label = "ลูกค้าจำเป็นต้องเลือก"
                        checked={checked1}
                        onPress={() => {
                            setChecked1(!checked1);
                        }}
                    />
                    <CheckboxButton
                        label={"ลูกค้าสามารถเลือกได้มากกว่า 1 ช้อยส์"}
                        checked={checked2}
                        onPress={() => {
                            setChecked2(!checked2);
                        }}
                    />
            <View>
                <>
                    {checked2 ? (
                        <View style={[styles.row]}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={styles.text}>เลือกได้สูงสุด</Text>
                            </View>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <Number number={number} setNumber={setNumber} />
                            </View>
                        </View>
                    ) : (
                        ""
                    )}
                </>
            </View>
        </View>
    );
};

export default AddOptionsCheck;

const styles = StyleSheet.create({
    container: { backgroundColor: "white", borderRadius: 15 },
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
