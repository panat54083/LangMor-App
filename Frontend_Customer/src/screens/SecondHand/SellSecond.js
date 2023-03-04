//Packages
import React from "react";
//Components
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AddButton from "../../components/buttons/AddButton";

const SellSecond = ({ navigation }) => {
    const handleAddSecond = () => {
        navigation.navigate("AddSecond");
    };
    return (
        <ScrollView style={styles.scrollView_container}>
            <View style={styles.add_container}>
                <AddButton onPress={handleAddSecond} />
            </View>
        </ScrollView>
    );
};

export default SellSecond;

const styles = StyleSheet.create({
    scrollView_container: {
        flex: 1,
    },
    add_container: {
        marginHorizontal: 15,
    },
});
