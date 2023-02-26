//Packages
import React, { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
//Components
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    ScrollView,
    SectionList,
} from "react-native";
import AddButton from "../../components/buttons/AddButton";
import FoodCard from "../../components/Cards/FoodCard";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const MenuManage = ({ navigation }) => {
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    const [foodsData, setFoodsData] = useState([]);

    useEffect(() => {
        if (isFocused) {
            fetchFoods();
        }
    }, [isFocused]);

    const formatToSectionList = (data) => {
        const result = [];
        const types = new Set();
        // get types
        data.forEach((food) => {
            types.add(food.type);
        });
        // add object to specific type
        types.forEach((type) => {
            result.push({
                title: type,
                data: data.filter((food) => food.type === type),
            });
        });

        return result;
    };
    const handleAddMenu = () => {
        // console.log("Add Menu");
        navigation.navigate("AddMenu", {
            foodData: {
                name: "",
                picture: null,
                price: "",
                description: "",
                options: [],
                type: "",
            },
        });
    };
    const handleCardFood = (food) => {
        // console.log(food);
        navigation.navigate("AddMenu", { foodData: food });
    };

    const fetchFoods = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/foods?restaurant_id=${state.restaurantData._id}`
            )
            .then((res) => {
                setFoodsData(formatToSectionList(res.data.foodsData));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.add_button}>
                <AddButton onPress={handleAddMenu} />
            </View>
            <SectionList
                sections={foodsData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => (
                    <View style={styles.foodCard}>
                        <FoodCard
                            key={index}
                            foodData={item}
                            onPress={() => {
                                handleCardFood(item);
                            }}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
};

export default MenuManage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5f5f5",
    },
    add_button: {
        marginHorizontal: 20,
    },
    foodCard: {
        marginHorizontal: 20,
    },
    header: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
        margin: 10,
    },
});

const dummy = {
    __v: 0,
    _id: "63f46ebe0ee8a09a9109668f",
    description: "ส้มตำ แต่ไม่มีส้ม",
    name: "ส้มตำ",
    options: [
        {
            __v: 0,
            _id: "63f46e580ee8a09a91096682",
            choices: [Array],
            maximum: 1,
            name: "ระดับความเผ็ด",
            required: true,
            restaurant_id: "63f46de10ee8a09a91096673",
        },
        {
            __v: 0,
            _id: "63f46e940ee8a09a91096686",
            choices: [Array],
            maximum: 0,
            name: "ของทานเล่น",
            required: false,
            restaurant_id: "63f46de10ee8a09a91096673",
        },
    ],
    picture: {
        access_mode: "public",
        asset_id: "6a5050df1c66e16eb723584e0b992189",
        bytes: 951647,
        created_at: "2023-02-21T07:11:56Z",
        etag: "a9abe278e5246a24827ed2ef893d3f93",
        folder: "LangMorApp/63f46de10ee8a09a91096673",
        format: "png",
        height: 1011,
        placeholder: false,
        public_id: "LangMorApp/63f46de10ee8a09a91096673/jhdn2obf3xnpbjfqjlsa",
        resource_type: "image",
        secure_url:
            "https://res.cloudinary.com/dzakkk7rf/image/upload/v1676963516/LangMorApp/63f46de10ee8a09a91096673/jhdn2obf3xnpbjfqjlsa.png",
        signature: "15f6f49bd39e91e8f8f031bd8c944a98818e6dc2",
        tags: [],
        type: "upload",
        url: "http://res.cloudinary.com/dzakkk7rf/image/upload/v1676963516/LangMorApp/63f46de10ee8a09a91096673/jhdn2obf3xnpbjfqjlsa.png",
        version: 1676963516,
        version_id: "ca4d45fb6bce25b6751a9c79dbf679af",
        width: 1000,
    },
    price: 60,
    restaurant_id: "63f46de10ee8a09a91096673",
    type: "อาหารคาว",
};

const selectedOptions = [
    {
        __v: 0,
        _id: "63f46e940ee8a09a91096686",
        choices: [[Object], [Object], [Object]],
        maximum: 0,
        name: "ของทานเล่น",
        required: false,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
    {
        __v: 0,
        _id: "63f46fcd0ee8a09a910966ac",
        choices: [[Object], [Object], [Object], [Object]],
        maximum: 1,
        name: "ระดับความหวาน",
        required: true,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
];

const rawSelectoption = [
    {
        __v: 0,
        _id: "63f46e580ee8a09a91096682",
        choices: [[Object], [Object], [Object]],
        maximum: 1,
        name: "ระดับความเผ็ด",
        required: true,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
    {
        __v: 0,
        _id: "63f46e940ee8a09a91096686",
        choices: [[Object], [Object], [Object]],
        maximum: 0,
        name: "ของทานเล่น",
        required: false,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
];

const raw1 = [
    {
        __v: 0,
        _id: "63f46e580ee8a09a91096682",
        choices: [[Object], [Object], [Object]],
        maximum: 1,
        name: "ระดับความเผ็ด",
        required: true,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
    {
        __v: 0,
        _id: "63f46e940ee8a09a91096686",
        choices: [[Object], [Object], [Object]],
        maximum: 0,
        name: "ของทานเล่น",
        required: false,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
    {
        __v: 0,
        _id: "63f46e580ee8a09a91096682",
        choices: [[Object], [Object], [Object]],
        maximum: 1,
        name: "ระดับความเผ็ด",
        required: true,
        restaurant_id: "63f46de10ee8a09a91096673",
    },
];
