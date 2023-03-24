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

const FindLost = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listOfLostItems, setListOfLostItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    //Start up
    useEffect(() => {
        setSkip(0);
    }, [isFocused]);
    useEffect(() => {
        if (!isSearch) {
            api_getAllLostItems();
        }
    }, [skip, isSearch]);

    const api_getAllLostItems = () => {
        setIsLoading(skip ? false : true);
        axios
            .get(
                `http://${IP_ADDRESS}/lostItem/getLimit?type=${"find"}&owner_id=${
                    state.userData._id
                }&skip=${skip}&limit=10`
            )
            .then((res) => {
                // console.log(res.data.message);
                setListOfLostItems([
                    ...listOfLostItems,
                    ...res.data.listOfLostItems,
                ]);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleFindLostDetail = (data) => {
        // console.log(data);
        navigation.navigate("LostDetail", { lostData: data });
    };

    //search
    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            setSkip(0);
            setIsSearch(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/lostItem/search?keyword=${searchQuery}&owner_id=${state.userData._id}&type=find&skip=${skip}&limit=10`
                    );
                    const data = response.data.lostItemsData;
                    setListOfLostItems(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }, 1000);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setListOfLostItems([]);
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
            setSkip(skip + 10);
            // console.log("end");
        }
    };
    return (
        <>
            {/* <Text>FindLost screen</Text> */}
            {/* <Text>FindLost screen</Text> */}
            <View style={{ alignItems: "center", marginBottom: "4%" }}>
                <Searchbar
                    onSearchBoxChange={onSearchBoxChange}
                    searchText={searchQuery}
                />
            </View>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF7A00" />
                ) : listOfLostItems.length !== 0 ? (
                    listOfLostItems.map((item, index) => (
                        <View
                            style={{
                                marginBottom: 5,
                                width: "90%",
                                alignSelf: "center",
                            }}
                            key={index}
                        >
                            <Item
                                itemData={item}
                                onPress={() => {
                                    handleFindLostDetail(item);
                                }}
                                type={"lost"}
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
                            ไม่มีรายการตามหาของหาย
                        </Text>
                    </View>
                )}
            </ScrollView>
        </>
    );
};

export default FindLost;

const styles = StyleSheet.create({
    notFoundStyle: {
        fontFamily: "Kanit-Bold",
        fontSize: 22,
        textAlign: "center",
    },
});
