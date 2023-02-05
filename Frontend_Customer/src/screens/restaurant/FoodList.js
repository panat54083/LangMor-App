import { SectionList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Back from "../../components/buttons/Back";
import FoodListHeader from "../../components/headers/FoodListHeader";
import CardRestaurantName from "../../components/cards/CardRestaurantName";
import Searchbar from "../../components/searchs/Searchbar";

const FoodList = ({ route, navigation }) => {
    const { restaurant } = route.params;
    // ของจริง fecth จาก restaurant
    const foodData = [
        {
            title: "อาหารคาว",
            data: [
                { name: "ข้าวผัด", imgLink: "", details: "" },
                { name: "ข้าวกะเพราหมูกรอบ", imgLink: "", details: "" },
            ],
        },
        {
            title: "อาหารหวาน",
            data: [
                { name: "ไอติม", imgLink: "", details: "" },
                { name: "เค้กส้ม", imgLink: "", details: "" },
            ],
        },
        {
            title: "เครื่องดื่ม",
            data: [
                { name: "น้ำเปล่า", imgLink: "", details: "" },
                { name: "โคล่า", imgLink: "", details: "" },
            ],
        },
    ];
    return (
        <View style={{ flex: 1 }}>
            <FoodListHeader />
            <View style={{ marginTop: -50 }}>
                <CardRestaurantName restaurant={restaurant} />
            </View>
            <View
                style={{
                    backgroundColor: "#D9D9D9",
                    height: 55,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Searchbar height="45" />
            </View>
            <View
                style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: 10 }}
            >
                <SectionList
                    sections={foodData}
                    keyExtractor={(item, index) => item + index}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ marginBottom: 3 }}>
                            <Text style={styles.header}>{title}</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.name}</Text>
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
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
    },
    title: {
        fontSize: 24,
    },
});
