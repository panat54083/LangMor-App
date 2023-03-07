//Packages
import React, { useEffect, useContext, useState } from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";

const ChatContact = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            title: "แชท",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 22,
            },
            headerLeft: () => (
                <BackScreen
                    onPress={() => navigation.goBack()}
                    color="#FF7A00"
                />
            ),
        });
    }, []);
    return (
        <View>
            <Text>ChatContact</Text>
        </View>
    );
};

export default ChatContact;

const styles = StyleSheet.create({});
