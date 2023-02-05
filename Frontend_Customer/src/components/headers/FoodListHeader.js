import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../buttons/Back";
import Fav from "../buttons/Fav";
const FoodListHeader = (props) => {
    const { imgSrc } = props;
    const imgLink =
        "https://bk.asia-city.com/sites/default/files/u142691/burger_fb.jpg";
    return (
        <View style={{ width: "100%", height: 190 }}>
            <ImageBackground
                source={{ uri: imgLink }}
                resizeMode="cover"
                style={{ flex: 1, flexDirection: "row" }}
            >
                <View style={{ marginTop: 6, marginLeft: "2.2%" }}>
                    <Back />
                </View>
                <View
                    style={{
                        marginLeft: "auto",
                        marginTop: 6,
                        marginRight: "2.2%",
                    }}
                >
                    <Fav />
                </View>
            </ImageBackground>
        </View>
    );
};

export default FoodListHeader;

const styles = StyleSheet.create({});
