import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
// Components
import ImageInput from "../../components/Inputs/ImageInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import SelectMap from "../../components/buttons/SelectMap";
import AcceptButton from "../../components/buttons/AcceptButton";

const SetRestaurant = ({ navigation }) => {
    const [restaurantImage, setRestaurantImage] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        navigation.setOptions({});
    }, []);
    const handleImageInput = () => {
        console.log("Press Image");
    };
    const handleSelectMap = () => {
        console.log("Press Map");
    };
    const handleSave = () => {
        console.log("Press Save");
        console.log(`Restaurant Name: ${restaurantName}`);
        console.log(`Phone: ${phone}`);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.picture}>
                <ImageInput
                    lable={"เพิ่มรูปหน้าร้าน"}
                    onPress={handleImageInput}
                />
            </View>
            <View style={styles.detail}>
                <CustomTextInput
                    placeholder={"ชื่อร้านอาหาร"}
                    value={restaurantName}
                    onChangeText={setRestaurantName}
                />
                <CustomTextInput
                    placeholder={"เบอร์โทรศัพท์ร้าน/เจ้าของ"}
                    onChangeText={setPhone}
                    value={phone}
                    keyboardType="numeric"
                />
                <SelectMap onPress={handleSelectMap} />
            </View>
            <View style={styles.final}>
                <AcceptButton label={"บันทึกข้อมูล"} onPress={handleSave} />
            </View>
        </SafeAreaView>
    );
};

export default SetRestaurant;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        flexDirection: "column",
        flex:1,
    },
    picture: {
        margin: 20,
    },
    detail: {},
    final: {
        position: "absolute",
        bottom: 24,
    },
});
