import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import RadioButton from "./RadioButton";

const RadioSetBtn = (props) => {
    const option = {
        name: "ความหวาน",
        option: [
            { optName: "หวานน้อย", increasePrice: 0 },
            { optName: "หวานมาก", increasePrice: 10 },
            { optName: "หวานปกติ", increasePrice: 0 },
        ],
        requireFill: true,
        IsRadio: true,
    };
    const [selectedValue, setSelectedValue] = useState(null);

    const handleOnPress = (value) => {
        setSelectedValue(value);
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
                            onPress={() => handleOnPress(opt.optName)}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default RadioSetBtn;

const styles = StyleSheet.create({});
