//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";

const SelectRestaurant = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: "เลือกร้านค้า",
            headerStyle: {
                backgroundColor: "#FF7A00",
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 24,
            },
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    return (
        <View>
            <Text>SelectRestaurant</Text>
        </View>
    );
};

export default SelectRestaurant;

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
