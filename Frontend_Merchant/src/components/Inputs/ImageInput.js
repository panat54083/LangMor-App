import { View, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
const ImageInput = ({ lable, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: "white",
                height: 210,
                width: 280,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#C9C5C4",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{marginBottom:20}}>
                <FontAwesome5 name="plus" size={80} color="#FF7A00" />
            </View>
            <Text style={{fontFamily:"Kanit-Bold", fontSize:20}}>{lable}</Text>
        </Pressable>
    );
};

export default ImageInput;
