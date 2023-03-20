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
    Alert,
    Image,
} from "react-native";
import ImageInput from "../../components/Inputs/ImageInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import AcceptButton from "../../components/buttons/AcceptButton";
import BackScreen from "../../components/buttons/BackScreen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Config
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const SetRestaurant = ({ navigation }) => {
    const [restaurantName, setRestaurantName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [restaurantData, setRestaurantData] = useState(null);
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

    useEffect(() => {
        if (restaurantData) {
            navigation.navigate("SetImageRestaurant", {
                restaurantData: restaurantData,
            });
        }
    }, [restaurantData]);
    const handleSave = () => {
        if (restaurantName.trim() === "") {
            Alert.alert("Error", "กรุณาเติมชื่อร้านค้า");
            return false;
        }
        // console.log(`Restaurant Name: ${restaurantName}`);
        // console.log(`Owner_ID: ${state.userData._id}`);
        // console.log(`Phone: ${phone}`);
        // console.log(`Address: ${address}`);
        // console.log(`Banner: ${banner}`);
        fetchRegister();
    };

    const fetchRegister = () => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/register`, {
                name: restaurantName,
                owner: state.userData._id,
                phone: phone,
                address: address,
            })
            .then((res) => {
                console.log(res.data.message);
                setRestaurantData(res.data.restaurantData);
            })
            .catch((err) => {
                console.log("Register Error: ", err);
            });
    };
    return (
        <KeyboardAwareScrollView>

        <View style={styles.container}>
            <View style={styles.picture}>
                <Image
                    source={require("../../assets/icons/cafe.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.detail}>
                <CustomTextInput
                    placeholder={"ชื่อร้านอาหาร"}
                    value={restaurantName}
                    onChangeText={setRestaurantName}
                    required={true}
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
                    numberOfLines={3}
                />
            </View>
            <View style={styles.final}>
                <AcceptButton label={"บันทึกข้อมูล"} onPress={handleSave} />
            </View>
        </View>
        </KeyboardAwareScrollView>
    );
};

export default SetRestaurant;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#F5F5F5",
        // backgroundColor: "red",
        // marginHorizontal: "10%",
        marginTop: "5%",
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    picture: {
        // flex: 1,
        alignItems: "center",
    },
    image: {
        width: "80%",
        height: 200,
        // flex: 1,
        resizeMode: "contain",
        // marginTop: 36,
    },
    detail: {
        // flex: 1,
        marginTop: "5%",
        marginHorizontal: "10%",
    },
    final: {
        flex: 1,
        justifyContent: "flex-end",
        marginHorizontal: "5%",
        marginBottom: "5%",
    },
});
