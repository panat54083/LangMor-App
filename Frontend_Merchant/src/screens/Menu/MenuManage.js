//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AddButton from "../../components/buttons/AddButton";

const MenuManage = ({ navigation }) => {
    const handleAddMenu = () => {
        console.log("Add Menu")
        navigation.navigate("AddMenu")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.add_button}>
                <AddButton onPress={handleAddMenu} />
            </View>
        </SafeAreaView>
    );
};

export default MenuManage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5f5f5",
    },
    add_button: {
        marginHorizontal:20
    }
});
