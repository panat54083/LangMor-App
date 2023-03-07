import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CardMarket = (props) => {
    const { restaurant, onPressCard } = props;
    return (
        <View style={{ alignItems: "center" }}>
            <View style={[styles.card, styles.elevation]}>
                <TouchableOpacity
                    onPress={() => {
                        onPressCard(restaurant);
                    }}
                >
                    <View style={styles.container}>
                        <View>
                            <Image
                                style={styles.logo}
                                source={
                                    restaurant.picture
                                        ? { uri: `${restaurant.picture.url}` }
                                        : ""
                                }
                            />
                        </View>
                        <View style={{ width: "65%", height: 88 }}>
                            <Text style={styles.restName}>
                                {restaurant.name}
                            </Text>
                            <View>
                                {restaurant.types ? (
                                    <Text style={styles.body}>
                                        ขาย {restaurant.types.join()}{" "}
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CardMarket;

const styles = StyleSheet.create({
    logo: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 16,
    },
    container: {
        width: "92%",
        height: 110,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 350,
        // height: 110,
        marginBottom: 10,
    },
    elevation: {
        elevation: 5,
        shadowColor: "#171717",
    },
    restName: {
        fontSize: 18,
        fontFamily: "Kanit-Bold",
    },
    body: {
        fontFamily: "Kanit-Medium",
    },
});
