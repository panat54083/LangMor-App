import React from "react";
//conponents
import { StyleSheet, Text, View } from "react-native";
import { Checkbox, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
const AddOptionsCheck = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View>
            <Icon name="ios-person" size={30} color="#4F8EF7" />
            <Button icon="camera">Press me</Button>
            <Checkbox
                lable
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
        </View>
    );
};

export default AddOptionsCheck;

const styles = StyleSheet.create({
    container: {},
});
