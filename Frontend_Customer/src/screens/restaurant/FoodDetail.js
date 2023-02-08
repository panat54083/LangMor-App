import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FoodDetailHeader from "../../components/headers/FoodDetailHeader";
import RadioSetBtn from "../../components/buttons/RadioSetBtn";
const FoodDetail = ({ route, navigation }) => {
    const { food } = route.params;
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const foodOption = [
        {
            name: "ความหวาน",
            option: [
                { optName: "หวานน้อย", increasePrice: null },
                { optName: "หวานมาก", increasePrice: 10 },
                { optName: "หวานปกติ", increasePrice: null },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความเผ็ด",
            option: [
                { optName: "เผ็ดน้อย", increasePrice: null },
                { optName: "เผ็ดมาก", increasePrice: 10 },
                { optName: "เผ็ดปกติ", increasePrice: null },
            ],
            requireFill: false,
            IsRadio: false,
        },
        {
            name: "ความขม",
            option: [
                { optName: "เผ็ดน้อย", increasePrice: null },
                { optName: "เผ็ดมาก", increasePrice: 10 },
                { optName: "เผ็ดปกติ", increasePrice: null },
            ],
            requireFill: true,
            IsRadio: false,
        },
    ];
    const [requireFillCheck, setRequireFillCheck] = useState(() => {
        let array = [];
        foodOption.forEach((option) => {
            if (option.requireFill) {
                array.push({ name: option.name, check: false });
            }
        });
        return array;
    });
    // console.log(requireFillCheck);

    // const handlerRequire = () => {
    //     setRequireFillCheck((prevState) => {
    //         let newState = [];
    //         prevState.forEach((option) => {
    //             if (option.name === "ความหวาน") {
    //                 newState.push({ name: option.name, check: true });
    //             } else {
    //                 newState.push(option);
    //             }
    //         });
    //         return newState;
    //     });
    // };
    // useEffect(() => {
    //     console.log(requireFillCheck);
    // }, [requireFillCheck]);

    const handlerOnPressBack = () => {
        navigation.goBack();
    };
    return (
        <View>
            <FoodDetailHeader
                imgSrc={food.imgLink}
                handlerOnPressBack={handlerOnPressBack}
            />
            <RadioSetBtn/>
        </View>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({});
