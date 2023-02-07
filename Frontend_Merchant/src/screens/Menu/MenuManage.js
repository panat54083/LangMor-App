//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View } from "react-native";

const MenuManage = ({ navigation }) => {
    return (
        <View style = {styles.container}>
            <Text>MenuManage</Text>
        </View>
    );
};

export default MenuManage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F5f5f5"
    }
});
