//Packages
import React from "react";
// Components
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const FoodCard = ({ foodData, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {foodData.picture ? (
                <View style={styles.image_container}>
                    <Image
                        source={{
                            uri: `${foodData.picture.url}`,
                        }}
                        style={styles.image}
                    />
                </View>
            ) : (
                <View
                    style={[
                        styles.image_container,
                        { backgroundColor: "#DFDFDF" },
                    ]}
                >
                    <FontAwesome
                        name="file-image-o"
                        size={50}
                        color="#1A0700"
                    />
                </View>
            )}

            <View style={[styles.data, { flex: 1 }]}>
                <View style={{ width: "100%", }}>
                    <Text style={[styles.text]} ellipsizeMode="tail">
                        {foodData.name}
                    </Text>
                </View>
                <View style={{ width: undefined, maxWidth: 180 }}>
                    <Text
                        style={[styles.description, { color: "#9D9693" }]}
                        // adjustsFontSizeToFit={true}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {foodData.description}
                    </Text>
                </View>
                <Text style={styles.price}>{foodData.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginBottom: 10,
        flexDirection: "row",
        flex: 1,
        height: 100,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
    image_container: {
        height: 80,
        width: 80,
        backgroundColor: "#FFE8E0",
        margin: 15,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
    },
    data: {
        marginLeft: 10,
    },
    text: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 16,
        color: "#1A0700",
    },
    description: {
        fontFamily: "Kanit-Medium",
        fontSize: 14,
        color: "#1A0700",
    },
    price: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        color: "#FF4200",
    },
});
