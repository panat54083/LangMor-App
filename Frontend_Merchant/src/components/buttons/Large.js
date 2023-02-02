import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Pressable,
} from "react-native";
import React from "react";

const Large = ({ name, image, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "white",
                paddingLeft: 16,
                borderRadius: 15,
                marginRight: 20,
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                height: 146,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
            }}
        >
            <View
                style={{
                    alignItems: "flex-start",
                    flex: 3,
                    justifyContent: "center",
                    // backgroundColor: "red",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Kanit-Bold",
                        fontSize: 38,
                        color: "#1A0700",
                    }}
                >
                    {name}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    // backgroundColor: "blue",
                    justifyContent:"flex-end"
                }}
            >
                <Image
                    source={image}
                    style={{ width: 100, height: 100,  }}
                />
            </View>
        </TouchableOpacity>
    );
};

export default Large;

const styles = StyleSheet.create({});
