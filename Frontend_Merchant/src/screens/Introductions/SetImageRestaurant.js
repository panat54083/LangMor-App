//Packages
import React, { useEffect, useState, useContext } from "react";
import * as LIP from "../../lib/lm-image-picker";
import axios from "axios";
//Components
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ImageInput from "../../components/Inputs/ImageInput";
import AcceptButton from "../../components/buttons/AcceptButton";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const SetImageRestaurant = ({ navigation, route }) => {
    const { restaurantData } = route.params;
    const { state, onAction } = useContext(UserContext);
    const [banner, setBanner] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: "ตั้งรูปประจำร้าน",
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
    const handleSkip = () => {
        navigation.navigate("Congrat");
    };
    const handleSaveImage = async () => {
        setIsLoaded(true);
        LIP.handleUpload(banner, restaurantData._id)
            .then((data) => {
                // console.log(data)
                fetchUpdatedRestaurant({ picture: data });
                navigation.navigate("Congrat");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchUpdatedRestaurant = (data) => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/updated`, {
                restaurant_id: restaurantData._id,
                updated_data: data,
            })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.image_container}>
                <ImageInput
                    // label={"เพิ่มรูปหน้าร้าน"}
                    image={banner}
                    setImage={setBanner}
                />
            </View>
            <View style={styles.header_container}>
                <Text style={[styles.header]}>มาเพิ่มรูปหน้าร้านกันเถอะ</Text>
                <Text style={[styles.body]}>
                    จะทำให้<Text style={{ color: "#FF7A00" }}>ร้านค้าดูดี</Text>
                    ยิ่งขึ้น
                </Text>
            </View>
            <View style={styles.submitButton}>
                {!banner ? (
                    <AcceptButton
                        label="ข้ามไปก่อนแล้วกัน"
                        onPress={handleSkip}
                        backgroundColor="#FF0101"
                    />
                ) : (
                    <AcceptButton
                        label="ไปกันต่อเลย"
                        onPress={handleSaveImage}
                        isLoaded={isLoaded}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default SetImageRestaurant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header_container: {
        // flex: 1,
        alignItems: "center",
        marginBottom: 20,
    },
    image_container: {
        marginVertical: 20,
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 25,
        marginBottom: 10,
    },
    body: {
        fontFamily: "Kanit-Medium",
        fontSize: 16,
        color: "#C9C5C4",
    },
    submitButton: {
        justifyContent: "flex-end",
        flex: 1,
        marginBottom: "10%",
    },
});
