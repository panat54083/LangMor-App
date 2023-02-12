import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const AddressBoxDetail = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{ marginTop: 8, marginHorizontal: "3.74%" }}>
                <Ionicons name="location-outline" size={27} color="#FF4200" />
            </View>
            <View style={{ marginTop: 16, width: "70%" }}>
                <View style={{ marginBottom: 3 }}>
                    <Text style={styles.textHeader}>ที่อยู่จัดส่ง</Text>
                </View>
                <View style={{}}>
                    {/* ของจริงที่ใช้ข้อมูล จาก UserData */}
                    <Text style={styles.addressText}>
                        10 หอพักไก่ทอด ซ.วงศ์สว่าง 11
                    </Text>
                    <Text style={styles.addressText}>ปณัฎฐ์ 099-9999999</Text>
                </View>
            </View>
            <View style={styles.editIcon}>
                <MaterialIcons name="mode-edit" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );
};

export default AddressBoxDetail;

const styles = StyleSheet.create({
    addressText: {
        fontSize: 14,
        fontFamily: "Kanit-Bold",
        color: "#9D9693",
    },
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        flexDirection: "row",
        paddingBottom: 16,
    },
    editIcon: {
        justifyContent: "flex-end",
        marginLeft: "auto",
        marginHorizontal: "3.74%",
    },
    textHeader: { fontSize: 18, fontFamily: "Kanit-Bold" },
});
