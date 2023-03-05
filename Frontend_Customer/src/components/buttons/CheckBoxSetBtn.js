import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";

const CheckBoxSetBtn = (props) => {
    const {
        option,
        handlerOnCheckBoxChangeVal,
        seleValue,
        selePrice,
        maximum,
    } = props;
    const [checkedValues, setCheckedValues] = useState(
        seleValue ? seleValue : []
    );
    const [checkedValuesPrice, setCheckedValuesPrice] = useState(
        selePrice ? selePrice : []
    );

    const handleOnPress = (choice) => {
        // value
        const currentValueIndex = checkedValues.indexOf(choice.name);
        const newCheckedValues = [...checkedValues];
        if (currentValueIndex === -1) {
            newCheckedValues.push(choice.name);
        } else {
            newCheckedValues.splice(currentValueIndex, 1);
        }
        setCheckedValues(newCheckedValues);

        //price
        const newCheckedValuesPrice = [...checkedValuesPrice];
        if (currentValueIndex === -1) {
            newCheckedValuesPrice.push(
                choice.method === "increase" ? choice.price : choice.price * -1
            );
        } else {
            newCheckedValuesPrice.splice(currentValueIndex, 1);
        }
        setCheckedValuesPrice(newCheckedValuesPrice);
    };

    useEffect(() => {
        const data = {
            name: option.name,
            value: checkedValues,
            price: checkedValuesPrice,
        };
        handlerOnCheckBoxChangeVal(data);
    }, [checkedValues, checkedValuesPrice]);

    const createChackBox = (choice, disable = false) => {
        return (
            <View key={choice.name}>
                <Checkbox
                    label={choice.name}
                    price={
                        choice.method === "increase"
                            ? choice.price
                            : choice.price * -1
                    }
                    value={choice.name}
                    checked={checkedValues.includes(choice.name)}
                    onPress={() => handleOnPress(choice)}
                    disable={disable}
                />
            </View>
        );
    };
    return (
        <>
            {option.choices.map((choice) => {
                return (
                    <View key={choice.name}>
                        {checkedValues.length === maximum ? (
                            <View key={choice.name}>
                                {checkedValues.includes(choice.name) ? (
                                    <>{createChackBox(choice)}</>
                                ) : (
                                    <>{createChackBox(choice, true)}</>
                                )}
                            </View>
                        ) : (
                            <View key={choice.name}>
                                {createChackBox(choice)}
                            </View>
                        )}
                    </View>
                );
            })}
        </>
    );
};

export default CheckBoxSetBtn;

const styles = StyleSheet.create({});
