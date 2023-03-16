//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
//Components
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CardMarket from "../../components/Cards/CardMarket";
import Searchbar from "../../components/Inputs/Searchbar";
//Config
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const SelectRestaurant = ({ navigation }) => {
    //Data
    const [restaurants, setRestaurants] = useState([]);
    const { state, onAction } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //Startup
    useEffect(() => {
        navigation.setOptions({
            title: "เลือกร้านค้า",
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
        //API
        api_restaurantGetALL();
    }, []);

    const api_restaurantGetALL = () => {
        axios
            .get(`http://${IP_ADDRESS}/restaurant/all_restaurant`)
            .then((res) => {
                // console.log(res.data.restaurantData);
                setRestaurants(res.data.restaurantData);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const handleDebugger = () => {
        api_restaurantGetALL();
    };

    const handleSelectRestaurant = (data) => {
        // console.log(data);
        Alert.alert("การยืนยัน", "ต้องการเลือกเป็นสมาชิกร้านนี้ใช่หรือไม่", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => handlePressOK(data) },
        ]);
    };

    const api_registerRestaurantAsWorker = (restaurant) => {
        axios
            .post(`http://${IP_ADDRESS}/restaurant/registerAsWorker`, {
                restaurant_id: restaurant._id,
                worker_id: state.userData._id,
            })
            .then((res) => {
                console.log(res.data.message);
                onAction.updateUserData({
                    user: res.data.userData,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePressOK = (data) => {
        api_registerRestaurantAsWorker(data);
    };

    /// search
    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/restaurant/search_merchant_restaurant?keyword=${searchQuery}`
                    );
                    const data = response.data.restaurantsData;
                    // console.log(data);
                    setRestaurants(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            api_restaurantGetALL();
            setIsLoading(false);
        }
    }, [searchQuery]);
    const onSearchBoxChange = (text) => {
        setSearchQuery(text);
    };
    return (
        <ScrollView style={styles.container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            {/* <Text>SelectRestaurant</Text> */}
            <View style={styles.searchContainer}>
                <Searchbar
                    onSearchBoxChange={onSearchBoxChange}
                    searchText={searchQuery}
                />
            </View>
            <View style={styles.selected_restaurants}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF7A00" />
                ) : restaurants.length !== 0 ? (
                    restaurants.map((restaurant, index) => (
                        <CardMarket
                            key={index}
                            restaurant={restaurant}
                            onPressCard={() =>
                                handleSelectRestaurant(restaurant)
                            }
                        />
                    ))
                ) : (
                    <Text style={styles.notFoundTextStyle}>
                        ไม่พบร้านค้าที่ค้นหา
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

export default SelectRestaurant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    selected_restaurants: {
        marginTop: "5%",
        marginHorizontal: "5%",
    },
    notFoundTextStyle: {
        fontSize: 16,
        fontFamily: "Kanit-Bold",
        textAlign: "center",
    },
    searchContainer: { alignItems: "center", marginTop: "4%" },
});
