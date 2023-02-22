//Packages
import React from "react";
//Components
import { StyleSheet, Text, View } from "react-native";

const ShowOrder = ({navigation, route}) => {
    const room = route.params
    return (
        <View>
            <Text>ShowOrder</Text>
        </View>
    );
};

export default ShowOrder;

const styles = StyleSheet.create({});
