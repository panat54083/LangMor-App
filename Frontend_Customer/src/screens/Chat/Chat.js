//packages
import React, { useContext, useEffect } from "react";
//components
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/cards/ChatInput";
//configs
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";

const Chat = ({ navigation }) => {
    const { basketDetail } = useContext(BasketContext);
    const { state } = useContext(UserContext);
    useEffect(() => {
        navigation.setOptions({
            title: "เพิ่มเมนูอาหาร",
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

    const old_restaurantData = {
        address: "address01",
        description: "ร้านป้านิดสุดอร่อย",
        id: 1,
        owner: "testuser01@gmail.com",
        rating: 4,
        restaurantName: "ร้านป้านิด",
        tags: ["ตามสั่ง"],
    };

    const new_restaurantData = {
        __v: 4,
        _id: "63e188c58ae333a7867b14f2",
        address: "หน้าวัดน้อย",
        closed: false,
        createdAt: "2023-02-06T23:09:57.371Z",
        name: "ร้านอาหารแอบแซ่บ",
        owner: "63e1887c8ae333a7867b14ef",
        phone: "0984396379",
        picture: {
            assetId: "48",
            duration: null,
            exif: null,
            height: 637,
            rotation: null,
            type: "image",
            uri: "file:///data/user/0/com.kmutnb.frontendlangmormerchant/cache/ImagePicker/321d95c5-2270-4aed-a895-1ec658c09e93.jpeg",
            width: 481,
        },
        types: ["อาหารคาว", "เครื่องดื่ม", "ขนมหวาน", "ของว่าง", "อาหารคลีน"],
        updatedAt: "2023-02-13T08:19:27.160Z",
        worker: [],
    };

    const handleGetInfo = () => {
        console.log(basketDetail.restaurant);
    };
    return (
        <View style={styles.main_container}>
            {/* <Button onPress={handleGetInfo} title="Press me!!" /> */}
            <View style={styles.messages_container}></View>
            <ChatInput />
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    messages_container: {
        flex: 10,
        // backgroundColor: "red",
    },
});
