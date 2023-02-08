import React from "react";
//conponents
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import Number from "../Inputs/Number";
const AddOptionsCheck = ({ number, setNumber }) => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Checkbox
                    color="#FF7A00"
                    status={checked1 ? "checked" : "unchecked"}
                    onPress={() => {
                        setChecked1(!checked1);
                    }}
                />
                <Text style={styles.text}>ลูกค้าจำเป็นต้องเลือก</Text>
            </View>
            <View style={styles.row}>
                <Checkbox
                    color="#FF7A00"
                    status={checked2 ? "checked" : "unchecked"}
                    onPress={() => {
                        setChecked2(!checked2);
                    }}
                />
                <Text style={styles.text}>
                    ลูกค้าสามารถเลือกได้มากกว่า 1 ช้อยส์
                </Text>
            </View>
            <View>
                <>
                    {checked2 ? (
                        <View style={[styles.row]}>
                            <View style={{ flex: 1, alignItems:"center" }}>
                                <Text style={styles.text}>
                                    เลือกได้สูงสุด
                                </Text>
                            </View>
                            <View style={{ flex: 2 ,alignItems:"center"}}>
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
    container: { backgroundColor: "white" },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
    },
    text: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 14,
        color: "#9D9693",
    },
});
