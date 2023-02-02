import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect } from "react";
import ImageInput from "../components/Inputs/ImageInput";

const SetRestaurant = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            // headerShown: false,
        });
    }, []);
    const handleImageInput = () => {
        console.log("Press");
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 20 }}>
                <ImageInput
                    lable={"เพิ่มรูปหน้าร้าน"}
                    onPress={handleImageInput}
                />
            </View>
        </SafeAreaView>
    );
};

export default SetRestaurant;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
        alignItems: "center",
    },
});
