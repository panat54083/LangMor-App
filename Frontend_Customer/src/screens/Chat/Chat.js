import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import BasketContext from "../../hooks/context/BasketContext";
import UserContext from "../../hooks/context/UserContext";

const Chat = () => {
    const { basketDetail } = useContext(BasketContext);
    const { state } = useContext(UserContext);
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("ข้อมูลใหญ่ 🙂", basketDetail.foods);
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("ข้อมูลใหญ่ with index 😑😑", basketDetail.foods[0]);
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("ข้อมูลOptions 😱😱😱😱", basketDetail.foods[0].options);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: "center" }}>
                    {/* show ชือ User */}
                    <Text>Hello ผม {state.userData.name}</Text>
                    <Text>Address รอใน </Text>
                    <Text>ต้องการซื้อ</Text>
                    {/* loop Order ทั้งหมด */}
                    {basketDetail.foods.map((order) => {
                        return (
                            <View style={styles.fooddetailContainer}>
                                <View>
                                    <Text>{order.food.name} </Text>
                                </View>
                                <View>
                                    {/* loop ดู Option ดู Option name เเละตัวเลือกที่เลือก */}
                                    {order.options.map((option) => {
                                        if (option.value) {
                                            if (option.value.length !== 0) {
                                                if (
                                                    Array.isArray(option.value)
                                                ) {
                                                    return (
                                                        <>
                                                            <Text
                                                                key={
                                                                    option.name
                                                                }
                                                            >
                                                                {option.name}
                                                            </Text>
                                                            <Text>
                                                                {option.value.toString()}
                                                            </Text>
                                                        </>
                                                    );
                                                } else {
                                                    return (
                                                        <>
                                                            <Text
                                                                key={
                                                                    option.name
                                                                }
                                                            >
                                                                {option.name}
                                                            </Text>
                                                            <Text>
                                                                {option.value}
                                                            </Text>
                                                        </>
                                                    );
                                                }
                                            }
                                        }
                                    })}
                                </View>
                                <View>
                                    {order.moreDetail ? (
                                        <Text>{order.moreDetail}</Text>
                                    ) : null}
                                </View>
                                <View>
                                    <Text> x{order.amount} </Text>
                                </View>
                                <View>
                                    <Text>
                                        ราคา {order.amount * order.price} B.
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    fooddetailContainer: {
        flexDirection: "row",
        backgroundColor: "green",
        width: "90%",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "3%",
    },
});
