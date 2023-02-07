import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../buttons/Back";


const FoodDetailHeader = (props) => {
    const { imgSrc ,handlerOnPressBack } = props;
    const imgLink =
        "https://bk.asia-city.com/sites/default/files/u142691/burger_fb.jpg";
    return (
        <View style={{ width: "100%", height: 158 }}>
            <ImageBackground
                source={{ uri: imgSrc? (imgSrc):(imgLink) }}
                resizeMode="cover"
                style={{ flex: 1, flexDirection: "row" }}
            >
                <View style={{ marginTop: 6, marginLeft: "2.2%" }}>
                    <Back handlerOnPressBack={handlerOnPressBack} reverseColor={true}/>
                </View>
            </ImageBackground>
        </View>
    );
};

export default FoodDetailHeader;

const styles = StyleSheet.create({});
