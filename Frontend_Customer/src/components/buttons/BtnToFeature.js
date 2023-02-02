import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const BtnToFeature = (props) => {
    const { name, imgSrc} = props;
    
    
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Image
                        source={imgSrc}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BtnToFeature;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        width: 320,
        height: 140,
        marginBottom: 13,
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontFamily:"Kanit-Bold",
        fontSize: 38,
    },
});
