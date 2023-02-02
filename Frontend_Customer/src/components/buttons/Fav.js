import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Fav = () => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Ionicons name="heart-outline" size={27} color="#FF7A00" />
            </View>
        </TouchableOpacity>
    );
};

export default Fav;

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
});
