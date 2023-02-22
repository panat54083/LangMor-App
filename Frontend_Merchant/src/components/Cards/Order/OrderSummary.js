//packages
import React from "react";
//components
import { StyleSheet, Text, View, Button } from "react-native";

const OrderSummary = ({ order }) => {
    const sum = order.cart.reduce((total, item) => total + item.price, 0);
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: "white", marginBottom: 10,}}>
            <View style={styles.header_container}>
                <View style={styles.header_listMenu}>
                    <Text style={styles.header_font}>รายการอาหาร</Text>
                </View>
                <View style={styles.header_price}>
                    <Text style={styles.header_font}>ราคา</Text>
                </View>
            </View>
            <View style={{ marginBottom: 12 }}>
                {order.cart
                    ? order.cart.map((food, index) => (
                          <View style={styles.body_container} key={index}>
                              <View style={styles.body_amount}>
                                  <View style={styles.box_price}>
                                      <Text style={styles.body_font_amount}>
                                          {food.amount}x
                                      </Text>
                                  </View>
                              </View>
                              <View style={styles.body_food}>
                                  <Text style={styles.body_font}>
                                      {food.food.name}
                                  </Text>
                                  {food.options.map((option, index) => {
                                      if (option.value) {
                                          if (option.value.length !== 0) {
                                              if (Array.isArray(option.value)) {
                                                  return (
                                                      <Text
                                                          key={index}
                                                          style={[
                                                              styles.body_font,
                                                              {
                                                                  color: "#C9C5C4",
                                                              },
                                                          ]}
                                                      >
                                                          {option.name}:{" "}
                                                          {option.value.toString()}
                                                      </Text>
                                                  );
                                              } else {
                                                  return (
                                                      <Text
                                                          key={index}
                                                          style={[
                                                              styles.body_font,
                                                              {
                                                                  color: "#C9C5C4",
                                                              },
                                                          ]}
                                                      >
                                                          {option.name}:{" "}
                                                          {option.value}
                                                      </Text>
                                                  );
                                              }
                                          }
                                      }
                                  })}
                                  <Text
                                      style={[
                                          styles.body_font,
                                          { color: "#C9C5C4" },
                                      ]}
                                  >
                                      {food.moreDetail}
                                  </Text>
                              </View>
                              <View style={styles.body_price}>
                                  <Text
                                      style={[
                                          styles.body_font,
                                          { color: "#1A0700", fontSize: 18 },
                                      ]}
                                  >
                                      {food.price}
                                  </Text>
                              </View>
                          </View>
                      ))
                    : ""}
            </View>

            </View>
            <View style={styles.total_container}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.total_font}>ทั้งหมด</Text>
                </View>
                <View style={{ flex: 0 ,marginRight: 5,}}>
                    <Text style={styles.total_font}>{sum} บาท</Text>
                </View>
            </View>
        </View>
    );
};

export default OrderSummary;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    header_container: {
        paddingTop: 8,
        flexDirection: "row",
        marginBottom: 16,
    },
    header_listMenu: {
        flex: 3,
        paddingLeft: 20,
        // backgroundColor: "red"
    },
    header_price: {
        flex: 1,
        alignItems: "center",
    },
    header_font: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        color: "#9D9693",
    },
    body_container: {
        flexDirection: "row",
    },
    body_amount: {
        alignItems: "center",
        flex: 1,
    },
    body_food: { flex: 6, paddingLeft: 10 },
    body_price: { flex: 2, alignItems: "center" },
    box_price: {
        borderWidth: 1,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderColor: "#DFDFDF",
    },
    body_font: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 14,
    },
    body_font_amount: {
        fontFamily: "Kanit-Bold",
        fontSize: 18,
    },
    total_container: {
        flexDirection: "row",
    },
    total_font: {
        fontFamily: "Kanit-Medium",
        fontSize: 18,
    },
});
