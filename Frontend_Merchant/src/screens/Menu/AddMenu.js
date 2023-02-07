//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
//Packages
import React,{useEffect} from "react";

const AddMenu = ({navigation}) => {
        useEffect(() => {
        navigation.setOptions({
            title: "เพิ่มเมนูอาหาร",
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
            <Text>AddMenu</Text>
        </View>
    );
};

export default AddMenu;

const styles = StyleSheet.create({});
