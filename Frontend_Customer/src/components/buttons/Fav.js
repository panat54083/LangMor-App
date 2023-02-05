import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Fav = () => {
    const [fav, setFav] = useState(false);
    const handlerOnPressFav = () => {
        console.log(fav);
        setFav((prevState) => !prevState);
    };
    return (
        <TouchableOpacity onPress={handlerOnPressFav}>
            <View style={styles.container}>
                <Ionicons
                    name={fav ? "heart" : "heart-outline"}
                    size={27}
                    color="#FF7A00"
                />
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
