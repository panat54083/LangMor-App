import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";

const CheckBoxSetBtn = (props) => {
    const { option } = props;

    const [checkedValues, setCheckedValues] = useState([]);

    const handleOnPress = (value) => {
        const currentIndex = checkedValues.indexOf(value);
        const newCheckedValues = [...checkedValues];

        if (currentIndex === -1) {
            newCheckedValues.push(value);
        } else {
            newCheckedValues.splice(currentIndex, 1);
        }

        setCheckedValues(newCheckedValues);
    };
    // check log
    useEffect(() => {
        console.log(checkedValues);
    }, [checkedValues]);
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
                            onPress={() => handleOnPress(opt.optName)}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default CheckBoxSetBtn;

const styles = StyleSheet.create({});
