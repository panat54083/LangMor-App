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

    const handleOnPress = (choice) => {
        setSelectedValuePrice(choice.price);
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
                                    ? choice.price
                                    : choice.price * -1
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
