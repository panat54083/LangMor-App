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
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //Start up
    useEffect(() => {
        if (isFocused) {
            api_getAllSecondHands();
        }
    }, [isFocused]);

    const api_getAllSecondHands = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getAll?owner_id=${state.userData._id}`
            )
            .then((res) => {
                // console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
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
            api_getAllSecondHands();
            setIsLoading(false);
        }
    }, [searchQuery]);

    const onSearchBoxChange = (text) => {
        setSearchQuery(text);
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
            <ScrollView style={{}}>
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
