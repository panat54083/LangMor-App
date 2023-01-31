import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const GoogleLogin = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "#FFFFFF",
                padding: 10,
                borderRadius: 15,
                marginBottom: 30,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Image
                    source={require("../../assets/icons/google.png")}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <View
                    style={{
                        alignItems: "center",
                        // backgroundColor:"red",
                        // marginLeft: "30%",
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            // alignItems: "center",
                            fontFamily: "Kanit-Medium",
                            fontSize: 16,
                            color: "#1A0700",
                        }}
                    >
                        GOOGLE
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default GoogleLogin;
