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
    icon,
    backgroundColor = "#FF7A00",
    isLoaded = false,
    fontSize = 20,
    disable = false,
}) => {
    return (
        <>
            {!isLoaded ? (
                <TouchableOpacity
                    onPress={onPress}
                    style={[
                        styles.button,
                        styles.shadow,
                        {
                            backgroundColor: backgroundColor,
                            flexDirection: "row",
                            justifyContent: "center",
                        },
                        disable ? { backgroundColor: "#F6F6F6" } : null,
                    ]}
                    disabled={disable}
                >
                    {icon}
                    {label ? (
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: fontSize,
                                    marginLeft: icon ? 10 : 0,
                                },
                                disable ? { color: "#CCCCCC" } : null,
                            ]}
                        >
                            {label}
                        </Text>
                    ) : null}
                </TouchableOpacity>
            ) : (
                <View
                    style={[
                        styles.button,
                        styles.shadow,
                        { backgroundColor: "#D3D3D3" },
                    ]}
                >
                    <View style={{ marginVertical: 5, flexDirection: "row" }}>
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
