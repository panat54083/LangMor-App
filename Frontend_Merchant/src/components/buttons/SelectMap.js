import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";

const SelectMap = ({onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <MaterialCommunityIcons
                name="map-marker-outline"
                size={24}
                color="#FF4200"
            />
            <Text style={styles.text}>เลือกตำแหน่งร้าน</Text>
        <MaterialIcons name="arrow-forward-ios" size={16} color="#FF4200" />
        </Pressable>
    );
};

export default SelectMap;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
        width: 280,
        height: 40,
        borderRadius:4,
        margin:4,
    },
    text:{
        fontFamily: "Kanit-SemiBold",
        fontSize: 16,
        paddingHorizontal:50,
    }
});
