import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
const AddressBox = () => {
    return (
        <View style={{ width: "66%", height: 45 }}>
            <TouchableOpacity>
                <View style={styles.container}>
                    <Ionicons name="location-sharp" size={24} color="#FF0101" />
                    <Text>หอพักของฉัน</Text>
                    <Ionicons name="pencil" size={21} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default AddressBox;

const styles = StyleSheet.create({
    container: {
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
    },
});
