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
            <RadioButton
                label="Option 1"
                value="option1"
                selected={selectedValue === "option1"}
                onPress={() => handleOnPress("option1")}
            />
            <RadioButton
                label="Option 2"
                value="option2"
                selected={selectedValue === "option2"}
                onPress={() => handleOnPress("option2")}
            />
            <RadioButton
                label="Option 3"
                value="option3"
                selected={selectedValue === "option3"}
                onPress={() => handleOnPress("option3")}
            />
        </View>
    );
};

export default RadioSetBtn;

const styles = StyleSheet.create({});
