import { SectionList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../../components/buttons/Back";
import FoodListHeader from "../../components/headers/FoodListHeader";
import CardRestaurantName from "../../components/cards/CardRestaurantName";
import Searchbar from "../../components/searchs/Searchbar";
import CardFood from "../../components/cards/CardFood";

const FoodList = ({ route, navigation }) => {
    const { restaurant } = route.params;
    // ของจริง fecth จาก restaurant
    const foodData = [
        {
            title: "อาหารคาว",
            data: [
                {
                    name: "ข้าวผัด",
                    imgLink:
                        "https://www.ajinomoto.co.th//storage/photos/shares/our-story/tips/friedrice/62ff47ff5a301.jpg",
                    detail: "ข้าวผัดสุดอร่อย",
                    price: 60,
                },
                {
                    name: "ข้าวกะเพราหมูกรอบ",
                    imgLink:
                        "https://i.ytimg.com/vi/cFciXuCdG_o/maxresdefault.jpg",
                    detail: "ข้าวกะเพราหมูกรอบสุดอร่อย",
                    price: 65,
                },
            ],
        },
        {
            title: "อาหารหวาน",
            data: [
                {
                    name: "ไอติม",
                    imgLink:
                        "https://sites.google.com/site/icecreamtimtim56/_/rsrc/1430359844681/15-khwam-lab-khxng-xi-ti-m-thi-khun-mi-khey-ru-ma-kxn/ice20cream00%5B1%5D.jpg?height=398&width=479",
                    detail: "ไอติมสุดอร่อย",
                    price: 25,
                },
                {
                    name: "เค้กส้ม",
                    imgLink:
                        "https://www.smeleader.com/wp-content/uploads/2022/02/%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%81%E0%B8%AA%E0%B9%89%E0%B8%A1-%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%81%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%A1-%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%81%E0%B8%8A%E0%B8%B4%E0%B8%9F%E0%B8%9F%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B8%AA%E0%B9%89%E0%B8%A1-%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%81%E0%B9%82%E0%B8%A3%E0%B8%A5%E0%B8%AA%E0%B9%89%E0%B8%A1-12-scaled.jpg",
                    detail: "เค้กส้มสุดอร่อย",
                    price: 45,
                },
            ],
        },
        {
            title: "เครื่องดื่ม",
            data: [
                {
                    name: "น้ำเปล่า",
                    imgLink:
                        "https://ocs-k8s-prod.s3.ap-southeast-1.amazonaws.com/MENU_1603791069395.jpeg",
                    detail: "น้ำเปล่าสุดอร่อย",
                    price: 10,
                },
                {
                    name: "โคล่า",
                    imgLink:
                        "https://cf.shopee.co.th/file/bfe464167ee3affed2884a861e0e4baa",
                    detail: "โคล่าสุดอร่อย",
                    price: 30,
                },
            ],
        },
    ];

    const handlerOnPressBack = () => {
        navigation.goBack();
    };
    const handlerOnPressCard = (food) => {
        navigation.navigate("FoodDetail", { food: food });
    };
    return (
        <View style={{ flex: 1 }}>
            <FoodListHeader handlerOnPressBack={handlerOnPressBack} />
            <View style={{ marginTop: -50 }}>
                <CardRestaurantName restaurant={restaurant} />
            </View>
            <View style={styles.searchbar}>
                <Searchbar height="45" />
            </View>
            <View style={styles.sectionListContainer}>
                <SectionList
                    sections={foodData}
                    keyExtractor={(item, index) => item + index}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ marginBottom: 3, marginLeft: "2.1%" }}>
                            <Text style={styles.header}>{title}</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <View style={styles.item}>
                            {/* <Text style={styles.title}>{item.name}</Text> */}
                            <CardFood
                                food={item}
                                handlerOnPressCard={handlerOnPressCard}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default FoodList;

const styles = StyleSheet.create({
    item: {
        marginBottom: 7,
    },
    header: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
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
    },
});
