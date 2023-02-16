import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";

const CheckBoxSetBtn = (props) => {
    const { option, handlerOnCheckBoxChangeVal } = props;
    const [checkedValues, setCheckedValues] = useState([]);
    const [checkedValuesPrice, setCheckedValuesPrice] = useState([]);

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
    return (
        <View>
            {option.choices.map((choice) => {
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
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default CheckBoxSetBtn;

const styles = StyleSheet.create({});
