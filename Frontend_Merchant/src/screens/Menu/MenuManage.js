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
        console.log("Add Menu");
        navigation.navigate("AddMenu");
    };
    const handleCardFood= (food) => {
        console.log(food);
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
                        <FoodCard key={index} foodData={item} onPress={()=>{handleCardFood(item)}} />
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
