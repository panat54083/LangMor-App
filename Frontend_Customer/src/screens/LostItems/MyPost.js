//Packages
import React from "react";
//Components
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AddButton from "../../components/buttons/AddButton";

const MyPost = ({navigation}) => {
    const handleAddLost = () => {
        navigation.navigate("AddLost")
    }
    return (
        <ScrollView style={styles.scrollView_container}>
            <View style={styles.add_container}>
                <AddButton onPress={handleAddLost}/>
            </View>
        </ScrollView>
    );
};

export default MyPost;

const styles = StyleSheet.create({
    scrollView_container: {
        flex: 1,
    },
    add_container: {
        marginHorizontal: 15,
    },
});
