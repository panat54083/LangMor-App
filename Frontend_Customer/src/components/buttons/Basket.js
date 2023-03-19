import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
const Basket = (props) => {
    const { onPress, number } = props;
    return (
        <TouchableOpacity
            style={{ borderRadius: 50 }}
            onPress={() => (onPress ? onPress() : null)}
        >
            <View
                style={{
                    alignSelf: "center",
                    backgroundColor: "#FF7A00",
                    borderRadius: 50,
                }}
            >
                <FontAwesome
                    name="shopping-basket"
                    size={24}
                    color="#FFFFFF"
                    style={{ padding: "4%" }}
                />
                <View
                    style={{
                        position: "absolute",
                        backgroundColor: "#FFFFFF",
                        right: "16%",
                        top: "6%",
                        borderRadius: 50,
                        width: number >= 100 ? "50%" : "40%",
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#FF7A00",
                            fontFamily: "Kanit-Bold",
                        }}
                    >
                        {number}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Basket;

const styles = StyleSheet.create({});
