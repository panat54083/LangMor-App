import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import RadioButton from "./RadioButton";

const RadioSetBtn = (props) => {
    const { option, handlerOnRadioChangeVal } = props;
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedValuePrice, setSelectedValuePrice] = useState(0);
    
    useEffect(() => {
        const data = {
            name: option.name,
            value: selectedValue,
            price: selectedValuePrice,
        };
        handlerOnRadioChangeVal(data);
    }, [selectedValue]);

    const handleOnPress = (value) => {
        setSelectedValuePrice(value.increasePrice);
        setSelectedValue(value.optName);
    };
    return (
        <View>
            {option.option.map((opt) => {
                return (
                    <View key={opt.optName}>
                        <RadioButton
                            label={opt.optName}
                            increasePrice={opt.increasePrice}
                            value={opt.optName}
                            selected={selectedValue === opt.optName}
                            onPress={() => handleOnPress(opt)}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default RadioSetBtn;

const styles = StyleSheet.create({});
