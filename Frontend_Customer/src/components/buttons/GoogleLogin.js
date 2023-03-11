import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const GoogleLogin = ({ onPress, onPressIn, onPressOut, isPressed }) => {
    return (
        <TouchableOpacity
            // onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                {
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
                },
                isPressed ? { opacity: 0.2 } : null,
            ]}
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
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
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
