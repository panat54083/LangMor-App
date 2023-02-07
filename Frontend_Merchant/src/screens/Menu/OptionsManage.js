//Packages
import React, { useEffect } from "react";
//Components
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import AddButton from "../../components/buttons/AddButton";

const OptionsManage = ({ navigation }) => {
    const handleAddOptions = () => {
        console.log("Add Options");
        navigation.navigate("AddOptions");
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.add_button}>
                <AddButton onPress={handleAddOptions} />
            </View>
        </SafeAreaView>
    );
};

export default OptionsManage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5f5f5",
    },
    add_button: {
        marginHorizontal: 20,
    },
});
