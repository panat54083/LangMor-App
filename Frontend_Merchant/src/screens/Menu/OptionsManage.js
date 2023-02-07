//packages
import React ,{useEffect} from "react";
//components
import { StyleSheet, Text, View } from "react-native";

const OptionsManage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>OptionsManage</Text>
        </View>
    );
};

export default OptionsManage;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#F5f5f5", 
    }
});
