//Packages
import React from "react";
// Components
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

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
                <></>
            )}

            <View style={styles.data}>
                <Text style={styles.text}>{foodData.name}</Text>
                <Text style={styles.description}>{foodData.description}</Text>
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
        height: "90%",
        width: "90%",
    },
    data: {
        marginLeft: 10,
    },
    text: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 20,
        color: "#1A0700",
    },
    description: {
        fontFamily: "Kanit-Medium",
        fontSize: 10,
        color: "#1A0700",
    },
    price: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        color: "#FF4200",
    },
});
