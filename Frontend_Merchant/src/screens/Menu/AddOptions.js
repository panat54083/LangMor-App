//Components
import { StyleSheet, Text, View } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
//Packages
import React,{useEffect} from "react";

const AddOptions = ({navigation}) => {
        useEffect(() => {
        navigation.setOptions({
            title: "สร้างตัวเลือกใหม่",
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
      <Text>AddOptions</Text>
    </View>
  )
}

export default AddOptions

const styles = StyleSheet.create({})