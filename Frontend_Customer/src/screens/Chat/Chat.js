//packages
import React, { useContext, useEffect } from "react";
//components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import ChatInput from "../../components/cards/Chat/ChatInput";
import MessageModel from "../../components/cards/Chat/MessageModel";
//configs
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";

const Chat = ({ navigation }) => {
    const { basketDetail } = useContext(BasketContext);
    const { state } = useContext(UserContext);
    useEffect(() => {
        navigation.setOptions({
            title: "หน้าแชท",
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
    const demo_restaurantData = {
        __v: 4,
        _id: "63e188c58ae333a7867b14f2",
        address: "หน้าวัดน้อย",
        closed: false,
        createdAt: "2023-02-06T23:09:57.371Z",
        name: "ร้านอาหารแอบแซ่บ",
        owner: "63e1887c8ae333a7867b14ef",
        phone: "0984396379",
        picture: null,
        types: ["อาหารคาว", "เครื่องดื่ม", "ขนมหวาน", "ของว่าง", "อาหารคลีน"],
        updatedAt: "2023-02-13T08:19:27.160Z",
        worker: [],
        description: "",
    };
    const listMessages = [
        { user: "A", message: "Hello B", id: 1 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
        { user: "Dipper Pine", message: "Hello A", id: 2 },
    ];
    const handleGetInfo = () => {
        connsole.log(basketDetail.foods[0].options);
    };
    return (
        <View style={styles.main_container}>
            {/* <Button onPress={handleGetInfo} title="Press me!!" /> */}
            <View style={styles.messages_container}>
                {listMessages[0] ? (
                    <FlatList
                        data={listMessages}
                        renderItem={({ item }) => (
                            <MessageModel
                                message={item}
                                user={state.userData.name}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                    />
                ) : (
                    <Text>No message</Text>
                )}
            </View>
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
    },
});
