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
    ActivityIndicator,
} from "react-native";
import Item from "../../components/cards/Item";
import Searchbar from "../../components/searchs/Searchbar";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const InformLost = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listOfLostItems, setListOfLostItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //Start up
    useEffect(() => {
        if (isFocused) {
            api_getAllLostItems();
        }
    }, [isFocused]);
    const api_getAllLostItems = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/lostItem/getAll?type=${"found"}&owner_id=${
                    state.userData._id
                }`
            )
            .then((res) => {
                // console.log(res.data.message);
                setListOfLostItems(res.data.listOfLostItems);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleInformLostDetail = (data) => {
        // console.log(data);
        navigation.navigate("LostDetail", { lostData: data });
    };

    //search
    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(
                        `http://${IP_ADDRESS}/lostItem/search?keyword=${searchQuery}&owner_id=${state.userData._id}&type=found`
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
            api_getAllLostItems();
            setIsLoading(false);
        }
    }, [searchQuery]);

    const onSearchBoxChange = (text) => {
        setSearchQuery(text);
    };
    return (
        <>
            {/* <Text>InformLost screen</Text> */}
            {/* <Text>InformLost screen</Text> */}
            <View style={{ alignItems: "center", marginBottom: "4%" }}>
                <Searchbar
                    onSearchBoxChange={onSearchBoxChange}
                    searchText={searchQuery}
                />
            </View>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF7A00" />
                ) : listOfLostItems.length !== 0 ? (
                    listOfLostItems.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                marginBottom: 5,
                                width: "90%",
                                alignSelf: "center",
                            }}
                        >
                            <Item
                                itemData={item}
                                onPress={() => {
                                    handleInformLostDetail(item);
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
                            ไม่มีรายการแจ้งของหาย
                        </Text>
                    </View>
                )}
            </ScrollView>
        </>
    );
};

export default InformLost;

const styles = StyleSheet.create({});
