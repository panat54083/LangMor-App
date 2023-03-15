import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import RadioButton from "./RadioButton";

const RadioSetBtn = (props) => {
    const { option, handlerOnRadioChangeVal, seleValue, selePrice } = props;
    const [selectedValue, setSelectedValue] = useState(
        seleValue ? seleValue : null
    );
    const [selectedValuePrice, setSelectedValuePrice] = useState(
        selePrice ? selePrice : 0
    );
    useEffect(() => {
        const data = {
            name: option.name,
            value: selectedValue,
            price: selectedValuePrice,
        };
        handlerOnRadioChangeVal(data);
    }, [selectedValue]);

    const handleOnPress = (choice) => {
        setSelectedValuePrice(
            choice.method === "increase"
                ? Number(choice.price)
                : Number(choice.price) * -1
        );
        setSelectedValue(choice.name);
    };
    return (
        <View>
            {option.choices.map((choice) => {
                return (
                    <View key={choice.name}>
                        <RadioButton
                            label={choice.name}
                            price={
                                choice.method === "increase"
                                    ? Number(choice.price)
                                    : Number(choice.price) * -1
                            }
                            value={choice.name}
                            selected={selectedValue === choice.name}
                            onPress={() => handleOnPress(choice)}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default RadioSetBtn;

const styles = StyleSheet.create({});
