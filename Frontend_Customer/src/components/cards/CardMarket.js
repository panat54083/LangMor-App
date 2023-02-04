import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CardMarket = (props) => {
    const { restaurant } = props;
    return (
        <View style={{ alignItems: "center" }}>
            <View style={[styles.card, styles.elevation]}>
                <TouchableOpacity onPress={()=>{console.log("Hello");}}>
                    <View style={styles.container}>
                        <View>
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium",
                                }}
                            />
                        </View>
                        <View style={{ width: "65%", height: 88 }}>
                            <Text style={styles.restName}>
                                {restaurant.restaurantName}
                            </Text>
                            <View>
                                <Text>เรทติ้ง {restaurant.rating} ดาว </Text>
                                <Text>ขาย {restaurant.tags.join()} </Text>
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
        height: 127,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 350,
        height: 127,
        marginBottom: 15,
    },
    elevation: {
        elevation: 5,
        shadowColor: "#171717",
    },
    restName: {
        fontSize: 22,
        fontWeight: "bold",
    },
});
