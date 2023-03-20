//Packages
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { IP_ADDRESS } from "@env";
import { AntDesign } from "@expo/vector-icons";
//Components
import {
    Modal,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Button,
} from "react-native";
import Searchbar from "../../components/searchs/Searchbar";
import Fav from "../../components/buttons/Fav";
import AddressBox from "../../components/buttons/AddressBox";
import CardMarket from "../../components/cards/CardMarket";
import CardRestaurantTag from "../../components/cards/CardRestaurantTag";
import BackScreen from "../../components/buttons/BackScreen";
import RandomBtn from "../../components/buttons/RandomBtn";
import FavRestaurants from "../../components/cards/Restaurant/FavRestaurants";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import Basket from "../../components/buttons/Basket";
//Configs
import BasketContext from "../../hooks/context/BasketContext";

const MarketList = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState();
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [favRestaurants, setFavRestaurants] = useState();
    useEffect(() => {
        // setHeader
        navigation.setOptions({
            title: "สั่งอาหาร",
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
            headerRight: () => (
                <View style={{ marginRight: "20%" }}>
                    <Fav onPress={onPressFav} />
                </View>
            ),
        });
        fetchRestaurants();
    }, []);
    const onPressFav = () => {
        navigation.navigate("FavRestaurants");
    };
    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/restaurant/search_restaurant?keyword=${searchQuery}`
                    );
                    const data = response.data.results;
                    setRestaurants(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            fetchRestaurants();
            // setIsLoading(false);
        }
    }, [searchQuery]);
    const onSearchBoxChange = (text) => {
        setSearchQuery(text);
    };

    const onPressCardMarket = (restaurant) => {
        navigation.navigate("FoodList", { restaurant: restaurant });
        setModalVisible(false);
    };
    const handleRandomRestaurants = () => {
        api_getRandomRestaurants()
            .then((data) => {
                // console.log(data);
                setFavRestaurants(data);
            })
            .catch((err) => {
                console.log(err);
            });
        if (!modalVisible) {
            setModalVisible(true);
        }
    };

    const api_getRandomRestaurants = async () => {
        const number = 1;
        return axios
            .get(
                `http://${IP_ADDRESS}/restaurant/random_restaurants?number=${number}`
            )
            .then((res) => {
                console.log(res.data.message);
                // console.log(res.data.restaurantsData);
                return res.data.restaurantsData;
            })
            .catch((err) => {
                console.log(err.response.data.message);
                throw err;
            });
    };
    const fetchRestaurants = () => {
        setIsLoading(true);
        axios
            .get(`http://${IP_ADDRESS}/restaurant/all_restaurant`)
            .then((res) => {
                // console.log(res.data.restaurantData);
                setRestaurants(res.data.restaurantData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const findAmountOfOrder = (order) => {
        let amountOfOrder = 0;
        if (order.length !== 0) {
            order.forEach((food) => {
                amountOfOrder = amountOfOrder + food.amount;
            });
        }
        return amountOfOrder;
    };
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={{ marginTop: 18, marginLeft: "7%" }}>
                <AddressBox />
            </View> */}
            <View
                style={{
                    // width: "100%",
                    alignItems: "center",
                    marginVertical: 10,
                    flexDirection: "row",
                    marginHorizontal: "4%",
                }}
            >
                <View style={{ width: "83%", marginRight: "0%" }}>
                    <Searchbar
                        height="55"
                        style={{
                            width: "100%",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRightWidth: 0.1,
                            borderColor: "#DFDFDF",
                        }}
                        onSearchBoxChange={onSearchBoxChange}
                        searchText={searchQuery}
                    />
                </View>
                <RandomBtn
                    onPress={handleRandomRestaurants}
                    color={"#FF7A00"}
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeftWidth: 0.1,
                        borderColor: "#DFDFDF",
                    }}
                />
            </View>

            {/* <View>
                <Text style={styles.TagsText}>หมวดหมู่</Text>
                <View style={{}}>
                    <FlatList
                        data={allTags}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{}} onPress={() => {}}>
                                <CardRestaurantTag
                                    tagName={item.tag}
                                    imgSrc={item.source}
                                />
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                    />
                </View>
            </View> */}
            <View style={[styles.tick, { marginVertical: "2%" }]}></View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#FF7A00" />
            ) : (
                <View style={{ flex: 1 }}>
                    {restaurants > 0 ? (
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
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "5%",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Kanit-Bold",
                                    fontSize: 22,
                                    textAlign: "center",
                                    color: "#C9C5C4",
                                }}
                            >
                                ไม่พบร้านค้า
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {basketDetail.restaurant ? (
                <View style={styles.basket}>
                    <Basket
                        number={findAmountOfOrder(basketDetail.foods)}
                        onPress={() =>
                            onPressCardMarket(basketDetail.restaurant)
                        }
                    />
                </View>
            ) : null}

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                nRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            flex: 1,
                            width: "100%",
                            // alignSelf: "center",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // backgroundColor: "orange"
                        }}
                    >
                        <FavRestaurants
                            restaurantsData={favRestaurants}
                            onPressCardMarket={onPressCardMarket}
                        />
                        <View
                            style={{
                                width: "50%",
                                justifyContent: "center",
                                alignSelf: "center",
                            }}
                        >
                            <SubmitBtn
                                label={"สุ่มใหม่"}
                                icon={
                                    <AntDesign
                                        name="reload1"
                                        size={24}
                                        color="white"
                                    />
                                }
                                onPress={handleRandomRestaurants}
                                backgroundColor={"#63BE00"}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default MarketList;

const styles = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontFamily: "Kanit-Bold",
        fontSize: 28,
    },
    headerStyle: {
        backgroundColor: "#FF7A00",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FF7A00",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    TagsText: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
        marginLeft: "7%",
        margin: 8,
        marginBottom: 16,
    },
    cardMarket: {
        padding: 10,
        borderColor: "darkblue",
        borderWidth: 1,
        margin: 5,
        marginBottom: 10,
        borderRadius: 20,
    },
    tick: { height: 4, backgroundColor: "#DFDFDF" },
    basket: {
        position: "absolute",
        bottom: "4%",
        right: "4%",
    },
});
