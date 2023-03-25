//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    ActivityIndicator,
} from "react-native";
import Item from "../../components/cards/Item";
import Searchbar from "../../components/searchs/Searchbar";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const BuySecond = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listSecondHands, setListSecondHands] = useState([]);
    console.log("initail list: ", listSecondHands.length);
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingScroll, setIsLoadingScroll] = useState(false);
    const [skip, setSkip] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    //Start up
    useEffect(() => {
        setListSecondHands([])
        if (isFocused) {
            setSkip(0);
            // console.log("initial skip: ", skip)
            console.log("length :", listSecondHands.length);
        }
        console.log("isFocused");
    }, [isFocused]);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", () => {
    //         console.log("listener");
    //     });

    //     return unsubscribe;
    // }, [navigation]);

    useEffect(() => {
        if (!isSearch) {
            console.log("skip", skip);
            setIsLoading(skip ? false : true);
            setIsLoadingScroll(true);

            api_getAllSecondHands()
                .then((data) => {
                    setListSecondHands((prevList) => [...prevList, ...data]);
                    setIsLoading(false);
                    setIsLoadingScroll(false);
                })
                .catch((err) => console.log(err));
        }
    }, [skip, isSearch , isFocused]);

    const api_getAllSecondHands = async () => {
        return axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getLimit?owner_id=${state.userData._id}&skip=${skip}&limit=10`
            )
            .then((res) => {
                return res.data.listSecondHands;
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSecondDetail = (data) => {
        // console.log(data)
        navigation.navigate("SecondDetail", { secondData: data });
    };

    // search
    useEffect(() => {
        if (searchQuery) {
            setSkip(0);
            setIsSearch(true);
            // console.log("Hello searchQuery");
            setIsLoading(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/secondHand/search?keyword=${searchQuery}&owner_id=${state.userData._id}`
                    );
                    const data = response.data.secondHandsData;
                    setListSecondHands(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setListSecondHands([]);
            setIsSearch(false);
        }
    }, [searchQuery]);

    const onSearchBoxChange = (text) => {
        setSearchQuery(text);
    };
    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } =
            event.nativeEvent;
        const paddingToBottom = 1;
        const isEndReached =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;

        if (isEndReached) {
            if (skip < listSecondHands.length) {
                setSkip(skip + 10);
            }
            // console.log("end");
        }
    };
    return (
        <>
            {/* <Text>BuySecond screen</Text> */}
            <View style={{ alignItems: "center", marginBottom: "4%" }}>
                <Searchbar
                    onSearchBoxChange={onSearchBoxChange}
                    searchText={searchQuery}
                />
            </View>
            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF7A00" />
                ) : listSecondHands.length !== 0 ? (
                    listSecondHands.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                marginBottom: "1%",
                                width: "90%",
                                alignSelf: "center",
                            }}
                        >
                            <Item
                                itemData={item}
                                onPress={() => handleSecondDetail(item)}
                                type={"second"}
                            />
                        </View>
                    ))
                ) : (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
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
                            ไม่พบรายการสินค้า
                        </Text>
                    </View>
                )}
                {/* {isLoadingScrool && <ActivityIndicator />} */}
            </ScrollView>
        </>
    );
};

export default BuySecond;

const styles = StyleSheet.create({
    notFoundStyle: {
        fontFamily: "Kanit-Bold",
        fontSize: 22,
        textAlign: "center",
    },
});
