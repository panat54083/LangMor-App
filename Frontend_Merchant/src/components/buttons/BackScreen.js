import { StyleSheet, Pressable} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const BackScreen = ({navigation}) => {
    return (
        <Pressable
            onPress={() => {
                navigation.goBack();
            }}
            style={{
                // backgroundColor: "red",
                paddingVertical: 10,
                paddingHorizontal: 12,
            }}
        >
            <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </Pressable>
    );
};

export default BackScreen;

const styles = StyleSheet.create({});
