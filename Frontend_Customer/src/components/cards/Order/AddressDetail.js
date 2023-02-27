//Packages
import React from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddressDetail = ({ address }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="location-outline" size={30} color="#FF4200" />
            <View style={styles.detail}>
                <Text style={styles.textHeader}>ที่อยู่จัดส่ง</Text>
                <Text style={styles.textBody}>{address}</Text>
            </View>
        </View>
    );
};

export default AddressDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "baseline",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        marginLeft: 0,
    },

    editIcon: {
        justifyContent: "flex-end",
        marginLeft: "auto",
        marginHorizontal: "3.74%",
    },
    textHeader: { fontSize: 18, fontFamily: "Kanit-Bold" },
    textBody: { fontSize: 18, fontFamily: "Kanit-SemiBold", color: "#9D9693" },
});
