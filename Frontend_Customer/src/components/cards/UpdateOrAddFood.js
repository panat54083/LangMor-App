import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import SubmitBtn from "../buttons/SubmitBtn";
const UpdateOrAddFood = (props) => {
    const { setModalVisible, sameFood, navigationToFoodDetail } = props;
    const addNewMenu = () => {
        setModalVisible(false);
        navigationToFoodDetail(sameFood[0].food);
    };
    const handleOnPressEdit = (editOrder) => {
        setModalVisible(false);
        navigationToFoodDetail(sameFood[0].food, editOrder);
    };
    return (
        <View
            style={{
                backgroundColor: "#FFFFFF",
                paddingVertical: "3%",
                borderRadius: 20,
            }}
        >
            <View
                style={{
                    marginLeft: "5%",
                    marginBottom: "3%",
                }}
            >
                <Text style={{ fontSize: 22, fontFamily: "Kanit-Bold" }}>
                    {sameFood[0].food.name}
                </Text>
            </View>
            <View style={{ marginBottom: "4%" }}>
                {sameFood.map((order) => {
                    return (
                        <View key={order.id} style={styles.contentContainer}>
                            <View style={styles.amountView}>
                                <Text style={styles.amountText}>
                                    x{order.amount}
                                </Text>
                            </View>
                            <View style={{ flex: 1.25 }}>
                                <View>
                                    {order.options.map((option) => {
                                        if (option.value) {
                                            if (option.value.length !== 0) {
                                                if (
                                                    Array.isArray(option.value)
                                                ) {
                                                    return (
                                                        <Text
                                                            key={option.name}
                                                            style={
                                                                styles.optionText
                                                            }
                                                        >
                                                            {option.name}:{" "}
                                                            {option.value.toString()}
                                                        </Text>
                                                    );
                                                } else {
                                                    return (
                                                        <Text
                                                            key={option.name}
                                                            style={
                                                                styles.optionText
                                                            }
                                                        >
                                                            {option.name}:{" "}
                                                            {option.value}
                                                        </Text>
                                                    );
                                                }
                                            }
                                        }
                                    })}
                                </View>
                                <View>
                                    {order.moreDetail ? (
                                        <Text style={styles.optionText}>
                                            {order.moreDetail}
                                        </Text>
                                    ) : null}
                                </View>
                                <TouchableOpacity
                                    style={styles.editOpa}
                                    onPress={() => handleOnPressEdit(order)}
                                >
                                    <Text style={styles.editText}>Edit </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.priceView}>
                                <Text style={styles.priceText}>
                                    {order.price * order.amount} B.
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
            <View
                style={{
                    width: "86%",
                    alignSelf: "center",
                }}
            >
                <SubmitBtn
                    label={"เพิ่มรายการใหม่"}
                    onPress={() => addNewMenu()}
                />
            </View>
        </View>
    );
};

export default UpdateOrAddFood;

const styles = StyleSheet.create({
    contentContainer: {
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        marginTop: 6,
    },
    amountView: {
        flex: 0.5,
        alignItems: "center",
    },
    amountText: {
        fontSize: 20,
        fontFamily: "Kanit-Bold",
    },
    foodName: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
    },
    optionText: {
        fontSize: 14,
        fontFamily: "Kanit-Medium",
        opacity: 0.3,
    },
    editOpa: { alignSelf: "flex-start" },
    editText: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
        color: "#C9C5C4",
    },
    priceView: {
        flex: 0.5,
        alignItems: "center",
    },
    priceText: {
        fontSize: 16,
        fontFamily: "Kanit-Medium",
        color: "#9D9693",
    },
});
