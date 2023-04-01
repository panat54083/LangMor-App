import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
} from "react-native";
import ImageView from "react-native-image-viewing";
import React, { useState } from "react";
import Back from "../buttons/Back";

const FoodDetailHeader = (props) => {
    const { imgSrc, handlerOnPressBack } = props;
    const [visible, setIsVisible] = useState(false);
    const imgLink =
        "https://bk.asia-city.com/sites/default/files/u142691/burger_fb.jpg";
    return (
        <View style={{ width: "100%", height: imgSrc ? "20%" : "10%" }}>
            <ImageBackground
                source={{ uri: imgSrc ? imgSrc : null }}
                resizeMode="cover"
                style={{ flex: 1, flexDirection: "row" }}
            >
                <View style={{ marginTop: 6, marginLeft: "2.2%" }}>
                    <Back
                        handlerOnPressBack={handlerOnPressBack}
                        reverseColor={true}
                    />
                </View>
                <Pressable
                    onPress={() => setIsVisible(!visible)}
                    style={{ flex: 1 }}
                ></Pressable>
            </ImageBackground>
            <ImageView
                images={[{ uri: imgSrc ? imgSrc : null }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    );
};

export default FoodDetailHeader;

const styles = StyleSheet.create({});
