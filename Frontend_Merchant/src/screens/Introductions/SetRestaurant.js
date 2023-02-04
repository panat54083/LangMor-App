// Packages
import { useEffect, useState, useContext } from "react";
import axios from "axios";
// Components
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Pressable,
} from "react-native";
import ImageInput from "../../components/Inputs/ImageInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import BackScreen from "../../components/buttons/BackScreen";
// Config
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const SetRestaurant = ({ navigation }) => {
    const [restaurantName, setRestaurantName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [banner, setBanner] = useState(null);
    const { state } = useContext(UserContext);

    useEffect(() => {
        navigation.setOptions({
            title: "ตั้งร้านค้า",
            headerStyle: {
                backgroundColor: "#FF7A00",
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
            headerTitleStyle: {
                fontFamily: "Kanit-Bold",
                fontSize: 24,
            },
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    const handleSave = () => {
        // console.log(`Restaurant Name: ${restaurantName}`);
        // console.log(`Owner_ID: ${state.userData._id}`);
        // console.log(`Phone: ${phone}`);
        // console.log(`Address: ${address}`);
        // console.log(`Banner: ${banner}`);
        fetchRegister();
        navigation.navigate("Congrat")
    };

    const fetchRegister = () => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/register`, {
                name: restaurantName,
                owner: state.userData._id,
                phone: phone,
                picture: banner,
                address: address,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Register Error: ", err);
            });
    };
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <View style={styles.picture}>
                        <ImageInput
                            lable={"เพิ่มรูปหน้าร้าน"}
                            image={banner}
                            setImage={setBanner}
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
                        <CustomTextInput
                            placeholder={`สถานที่ตั้ง\nเช่น หน้าวัดน้อย...`}
                            value={address}
                            onChangeText={setAddress}
                            multiline={true}
                            numberOfLines={2}
                        />
                    </View>
                    <View style={styles.final}>
                        <AcceptButton
                            label={"บันทึกข้อมูล"}
                            onPress={handleSave}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SetRestaurant;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
    },
    picture: {
        margin: 20,
        // flex:2,
    },
    detail: {},
    final: {
        // position: "absolute",
        bottom: 0,
        flex: 1,
        justifyContent: "flex-end",
        padding: 20,
        // marginTop: 170,
        // marginBottom: 36,
    },
});
