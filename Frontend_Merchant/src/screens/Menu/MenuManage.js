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

    const handleAddMenu = () => {
        console.log("Add Menu");
        navigation.navigate("AddMenu");
    };
    const handleFoods = () => {
        console.log(foodsData);
    };
    const fetchFoods = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/foods?restaurant_id=${state.restaurantData._id}`
            )
            .then((res) => {
                setFoodsData(res.data.foodsData);
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
            <ScrollView>
                <View style={styles.foodCard}>
                    {foodsData.map((food, index) => (
                        <FoodCard key={index} foodData={food} />
                    ))}
                </View>
            </ScrollView>
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
});
