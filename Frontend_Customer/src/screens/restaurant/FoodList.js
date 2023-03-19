import {
    Button,
    Modal,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IP_ADDRESS } from "@env";
import FoodListHeader from "../../components/headers/FoodListHeader";
import CardRestaurantName from "../../components/cards/CardRestaurantName";
import Searchbar from "../../components/searchs/Searchbar";
import CardFood from "../../components/cards/CardFood";
import BasketContext from "../../hooks/context/BasketContext";
import BtnToBasketDetail from "../../components/buttons/BtnToBasketDetail";
import UpdateOrAddFood from "../../components/cards/UpdateOrAddFood";
import UserContext from "../../hooks/context/UserContext";

const FoodList = ({ route, navigation }) => {
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    const { onAction, state } = useContext(UserContext);
    const { restaurant } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [foodsData, setfoodsData] = useState();
    const [sameFoodInBasket, setSameFoodInbasket] = useState();
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOnFav, setIsOnFav] = useState(false);

    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    // console.log(restaurant._id, searchQuery);
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/restaurant/search_foods?restaurant_id=${restaurant._id}&keyword=${searchQuery}`
                    );
                    const data = response.data.foodsData;
                    setfoodsData(formatToSectionList(data));
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            fetchFoods();
        }
    }, [searchQuery]);
    const fetchFoods = () => {
        setIsLoading(true);
        axios
            .get(
                `http://${IP_ADDRESS}/restaurant/foods?restaurant_id=${restaurant._id}`
            )
            .then((res) => {
                // console.log(formatToSectionList(res.data.foodsData)[0].data[1].options);
                setfoodsData(formatToSectionList(res.data.foodsData));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const api_updateFavorite = () => {
        setIsOnFav(true);
        axios
            .post(`http://${IP_ADDRESS}/customer/update_fav`, {
                restaurant_id: restaurant._id,
                customer_id: state.userData._id,
            })
            .then((res) => {
                // console.log(res.data.message);
                // console.log(res.data.userData.favorite_restaurants);
                onAction.updateUserData({
                    user: res.data.userData,
                });
                setIsOnFav(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onPressFav = () => {
        if (!isOnFav) {
            api_updateFavorite();
        }
    };
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
    const findAmountOfOrder = () => {
        //Find Amount Of Order In Basket
        let amountOfOrder = 0;
        if (basketDetail.foods.length !== 0) {
            basketDetail.foods.forEach((food) => {
                amountOfOrder = amountOfOrder + food.amount;
            });
        }
        return amountOfOrder;
    };
    const amount = findAmountOfOrder();
    const findPriceOfOrder = () => {
        let priceOfOrder = 0;
        if (basketDetail.foods.length !== 0) {
            basketDetail.foods.forEach((food) => {
                let foodPrice = food.food.price;
                food.options.forEach((option) => {
                    if (Array.isArray(option.price)) {
                        const sum = option.price.reduce(
                            (partialSum, price) => partialSum + price,
                            0
                        );
                        foodPrice = foodPrice + sum;
                    } else {
                        foodPrice = foodPrice + option.price;
                    }
                });
                for (let i = 0; i < food.amount; i++) {
                    priceOfOrder = priceOfOrder + foodPrice;
                }
            });
        }
        return priceOfOrder;
    };
    const price = findPriceOfOrder();
    const handlerOnPressBack = () => {
        navigation.goBack();
    };

    const handlerOnPressCard = (food, foodInBasket) => {
        // console.log(foodInBasket.length);
        if (foodInBasket.length === 0) {
            navigationToFoodDetail(food);
        } else {
            setModalVisible(true);
            setSameFoodInbasket(foodInBasket);
        }
    };
    const onSearchBoxChange = (text) => {
        // console.log(text);
        setSearchQuery(text);
    };
    const navigationToFoodDetail = (food, editFood = null) => {
        navigation.navigate("FoodDetail", {
            food: food,
            restaurant: restaurant,
            editOrder: editFood,
        });
    };
    const handlerOnPressBtnToBasketDetail = () => {
        navigation.navigate("Cart");
    };
    const addNewMenu = (food) => {
        setModalVisible(false);
        navigationToFoodDetail(food);
    };
    const handleOnPressEditOrder = (food, editOrder) => {
        setModalVisible(false);
        navigationToFoodDetail(food, editOrder);
    };
    const handleOnPressDeleteOrder = (order) => {
        // console.log("order", order.id);
        setModalVisible(false);
        setBasketDetail((prevDetail) => {
            const newDetail = { ...prevDetail };
            const index = newDetail.foods.findIndex((food) => {
                return food.id === order.id;
            });
            newDetail.foods.splice(index, 1);
            if (newDetail.foods.length === 0) {
                newDetail.restaurant = null;
            } else {
                newDetail.restaurant = restaurant;
            }
            // console.log(newDetail.foods);
            return newDetail;
        });
    };
    return (
        <View style={{ flex: 1 }}>
            <FoodListHeader
                isFav={state.userData.favorite_restaurants.includes(
                    restaurant._id
                )}
                disableFav={isOnFav}
                onPressFav={onPressFav}
                handlerOnPressBack={handlerOnPressBack}
                imgSrc={restaurant.picture}
            />
            <View style={{ marginTop: "-28%" }}>
                <CardRestaurantName restaurant={restaurant} />
            </View>
            <View style={styles.searchbar}>
                <Searchbar height="45" onSearchBoxChange={onSearchBoxChange} />
            </View>
            {foodsData ? (
                <View
                    style={
                        basketDetail.foods.length !== 0
                            ? styles.sectionListContainerWithPaddingBot
                            : styles.sectionListContainer
                    }
                >
                    <SectionList
                        sections={foodsData}
                        keyExtractor={(item, index) => item + index}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.headerSection}>
                                {/* <View
                                    style={[
                                        styles.tick,
                                        { marginVertical: "2%" },
                                    ]}
                                ></View> */}
                                <View
                                    style={{
                                        marginLeft: "2.1%",
                                        marginVertical: "2%",
                                    }}
                                >
                                    <Text style={styles.header}>
                                        {title ? title : "อื่นๆ"}
                                    </Text>
                                </View>
                                {/* <View
                                    style={[
                                        styles.tick,
                                        { marginVertical: "2%" },
                                    ]}
                                ></View> */}
                            </View>
                        )}
                        renderItem={({ item, index }) => (
                            <View style={[styles.item]}>
                                <CardFood
                                    food={item}
                                    handlerOnPressCard={handlerOnPressCard}
                                />
                            </View>
                        )}
                    />
                </View>
            ) : (
                <View>
                    <Text>Now loadding</Text>
                </View>
            )}

            {basketDetail.foods.length !== 0 &&
            basketDetail.restaurant._id === restaurant._id ? (
                <View style={styles.confirmOrderBtn}>
                    <BtnToBasketDetail
                        amount={amount}
                        price={price}
                        onPress={handlerOnPressBtnToBasketDetail}
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
                ></TouchableOpacity>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        flex: 1,
                    }}
                >
                    {sameFoodInBasket ? (
                        <UpdateOrAddFood
                            setModalVisible={(bool) => setModalVisible(bool)}
                            sameFood={sameFoodInBasket}
                            navigationToFoodDetail={navigationToFoodDetail}
                            addNewMenu={addNewMenu}
                            handleOnPressEditOrder={handleOnPressEditOrder}
                            handleOnPressDeleteOrder={handleOnPressDeleteOrder}
                        />
                    ) : null}
                </View>
            </Modal>
        </View>
    );
};

export default FoodList;

const styles = StyleSheet.create({
    item: {
        marginBottom: 0,
    },
    header: {
        fontSize: 14,
        fontFamily: "Kanit-Bold",
        color: "black",
    },
    title: {
        fontSize: 24,
    },
    searchbar: {
        backgroundColor: "#F5F5F5",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
    },
    sectionListContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 10,
        // marginBottom:'20%'
    },
    sectionListContainerWithPaddingBot: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 10,
        paddingBottom: "20%",
        // marginBottom:'20%'
    },
    headerSection: { marginBottom: 3 },
    confirmOrderBtn: {
        // backgroundColor: "red",
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginBottom: 20,
        width: "89.33%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    tick: { height: 4, backgroundColor: "#F5F5F5" },
});
