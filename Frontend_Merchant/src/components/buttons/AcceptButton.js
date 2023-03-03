import React from "react";
//conponent
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

const AcceptButton = ({
    label,
    onPress,
    backgroundColor = "#FF7A00",
    isLoaded = false,
    fontSize= 20,
}) => {
    return (
        <>
            {!isLoaded ? (
                <TouchableOpacity
                    onPress={onPress}
                    style={[
                        styles.button,
                        styles.shadow,
                        { backgroundColor: backgroundColor },
                    ]}
                >
                    <Text style={[styles.text, {fontSize: fontSize} ]}>{label}</Text>
                </TouchableOpacity>
            ) : (
                <View
                    style={[
                        styles.button,
                        styles.shadow,
                        { backgroundColor: "#DFDFDF"},
                    ]}
                >
                    <View style={{ marginVertical: 5 ,flexDirection:"row"}}>
                        <ActivityIndicator size={"small"} color="white" />
                    </View>
                </View>
            )}
        </>
    );
};

export default AcceptButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF7A00",
        borderRadius: 10,
        paddingVertical: 3,
        alignItems: "center",
    },
    text: {
        fontFamily: "Kanit-SemiBold",
        color: "white",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
