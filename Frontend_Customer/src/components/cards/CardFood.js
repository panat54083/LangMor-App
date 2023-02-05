import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CardFood = (props) => {
    const { food } = props;
    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.card}>
                <TouchableOpacity>
                    <View style={styles.container}>
                        <View>
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: food.imgLink,
                                }}
                            />
                        </View>
                        <View style={{ width: "65%", height: 88 }}>
                            <Text style={styles.foodName}>{food.name}</Text>
                            <View>
                                <Text style={{marginBottom:19}}>{food.detail}</Text>
                                <Text>ราคา <Text>{food.price}</Text> บาท</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CardFood;

const styles = StyleSheet.create({
    logo: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 16,
    },
    container: {
        width: "92%",
        height: 127,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "93%",
        height: 127,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    foodName: {
        fontSize: 22,
        fontWeight: "bold",
    },
});
