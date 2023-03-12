import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const ItemDetail = (props) => {
    const { item, type, owner } = props;
    return (
        <>
            {type === "second" ? (
                <View>
                    <View style={{ marginBottom: "8%" }}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.textPriceContainer}>
                            <FontAwesome5
                                name="money-bill-wave"
                                size={16}
                                color="green"
                            />
                            <Text style={styles.textPriceStyle}>
                                {`  ${item.price}`} บาท
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.detailTextStyle}>รายละเอียด</Text>
                        <Text
                            style={[
                                styles.textDetailStyle,
                                { marginBottom: "1%" },
                            ]}
                        >
                            ชื่อพ่อค้า: {owner.name} 
                        </Text>
                        <Text style={styles.textDetailStyle}>
                            รายละเอียดเพิ่มเติม: {item.detail}{" "}
                        </Text>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={{ marginBottom: "8%" }}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.textPriceContainer}>
                            <Text style={styles.textTypeStyle}>
                                {`ประเภท: ${
                                    item.type === "found"
                                        ? "เเจ้งของหาย"
                                        : "ตามหาของหาย"
                                }`}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.detailTextStyle}>รายละเอียด</Text>
                        <Text
                            style={[
                                styles.textDetailStyle,
                                { marginBottom: "1%" },
                            ]}
                        >
                            ชื่อผู้โพส: {owner.name} 
                        </Text>
                        <Text style={styles.textDetailStyle}>
                            {item.type === "found"
                                ? "พบที่: "
                                : "สถานที่ที่ทำหาย: "}
                            {item.detail}
                        </Text>
                    </View>
                </View>
            )}
        </>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    textPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textPriceStyle: {
        color: "#9D9693",
        fontFamily: "Kanit-Medium",
        fontSize: 18,
    },
    textDetailStyle: {
        color: "#9D9693",
        fontFamily: "Kanit-Medium",
        fontSize: 18,
    },
    itemName: {
        fontFamily: "Kanit-Bold",
        fontSize: 32,
        marginBottom: "2%",
    },
    detailTextStyle: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 32,
        marginBottom: "2%",
    },
    textTypeStyle: {
        color: "#9D9693",
        fontFamily: "Kanit-Medium",
        fontSize: 18,
    },
});
