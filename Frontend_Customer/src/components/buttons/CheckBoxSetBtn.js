import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";

const CheckBoxSetBtn = (props) => {
    const { option, handlerOnCheckBoxChangeVal } = props;
    const [checkedValues, setCheckedValues] = useState([]);
    const [checkedValuesPrice, setCheckedValuesPrice] = useState([]);

    const handleOnPress = (value) => {
        // value
        const currentValueIndex = checkedValues.indexOf(value.optName);
        const newCheckedValues = [...checkedValues];
        if (currentValueIndex === -1) {
            newCheckedValues.push(value.optName);
        } else {
            newCheckedValues.splice(currentValueIndex, 1);
        }
        setCheckedValues(newCheckedValues);

        // value price
        const currentPriceIndex = checkedValuesPrice.indexOf(
            value.increasePrice
        );
        const newCheckedValuesPrice = [...checkedValuesPrice];
        if (currentPriceIndex === -1) {
            newCheckedValuesPrice.push(value.increasePrice);
        } else {
            newCheckedValuesPrice.splice(currentPriceIndex, 1);
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
            {option.option.map((opt) => {
                return (
                    <View key={opt.optName}>
                        <Checkbox
                            label={opt.optName}
                            increasePrice={opt.increasePrice}
                            value={opt.optName}
                            checked={checkedValues.includes(opt.optName)}
                            onPress={() => handleOnPress(opt)}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default CheckBoxSetBtn;

const styles = StyleSheet.create({});
