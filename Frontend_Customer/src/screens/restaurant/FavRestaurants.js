import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Button,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import React, { useContext, useEffect, useState } from "react";
import BackScreen from "../../components/buttons/BackScreen";
import UserContext from "../../hooks/context/UserContext";
import CardMarket from "../../components/cards/CardMarket";
import { useIsFocused } from "@react-navigation/native";

const FavRestaurants = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    useEffect(() => {
        // setHeader
        navigation.setOptions({
            title: "ร้านโปรดของคุณ",
            headerStyle: {
                backgroundColor: "#FF7A00",
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
            headerTitleStyle: {
                fontFamily: "Kanit-SemiBold",
                fontSize: 24,
            },
            headerLeft: () => (
                <BackScreen onPress={() => navigation.goBack()} color="white" />
            ),
        });
        fetchRestaurants();
    }, [isFocused]);
    const fetchRestaurants = () => {
        setIsLoading(true);
        axios
            .get(`${API_URL}/restaurant/get_fav_restaurants`, {
                params: {
                    idList: state.userData.favorite_restaurants,
                },
            })
            .then((res) => {
                // console.log(res.data.restaurantsData);
                setRestaurants(res.data.restaurantsData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onPressCardMarket = (restaurant) => {
        navigation.navigate("FoodList", { restaurant: restaurant });
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: "5%" }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF7A00" />
                ) : restaurants.length !== 0 ? (
                    <View>
                        <FlatList
                            data={restaurants}
                            renderItem={({ item }) => (
                                <View style={{ marginHorizontal: "3%" }}>
                                    <CardMarket
                                        restaurant={item}
                                        onPressCard={onPressCardMarket}
                                    />
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Text style={styles.notHaveFav}>ไม่มีร้านโปรด</Text>
                )}
            </View>
        </View>
    );
};

export default FavRestaurants;

const styles = StyleSheet.create({
    notHaveFav: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 22,
        textAlign: "center",
        color: "#C9C5C4",
    },
});
