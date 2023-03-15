//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
//Components
import { Alert, Button, StyleSheet, Text, View , ScrollView} from "react-native";
import BackScreen from "../../components/buttons/BackScreen";
import CardMarket from "../../components/Cards/CardMarket";
//Config
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const SelectRestaurant = ({ navigation }) => {
    //Data
    const [restaurants, setRestaurants] = useState([]);
    const { state, onAction } = useContext(UserContext);
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
    return (
        <ScrollView style={styles.container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            {/* <Text>SelectRestaurant</Text> */}
            <View style={styles.selected_restaurants}>
                {restaurants.map((restaurant, index) => (
                    <CardMarket
                        key={index}
                        restaurant={restaurant}
                        onPressCard={() => handleSelectRestaurant(restaurant)}
                    />
                ))}
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
});
