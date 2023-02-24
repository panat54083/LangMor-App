//packages
import React from "react";
//components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const OrderMesssage = ({ order }) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.orderDetail}>
                {order.cart
                    ? order.cart.map((food, index) => (
                          <View style={styles.body_container} key={index}>
                            <View style={{flexDirection: "row"}}>
                              <Text style={[styles.body_font, {marginRight: 5,}]}>
                                  {food.amount} <Text style={{color: "white"}}>X</Text>
                              </Text>
                              <Text style={[styles.body_font, {flex: 0,}]}>
                                  {food.food.name}
                              </Text>

                            </View>
                              {food.options.map((option, index) => {
                                  if (option.value) {
                                      if (option.value.length !== 0) {
                                          if (Array.isArray(option.value)) {
                                              return (
                                                  <Text
                                                      key={index}
                                                      style={[styles.body_font]}
                                                  >
                                                      {option.name}:{" "}
                                                      {option.value.toString()}
                                                  </Text>
                                              );
                                          } else {
                                              return (
                                                  <Text
                                                      key={index}
                                                      style={[styles.body_font]}
                                                  >
                                                      {option.name}:{" "}
                                                      {option.value}
                                                  </Text>
                                              );
                                          }
                                      }
                                  }
                              })}
                              <Text style={[styles.body_font]}>
                                  {food.moreDetail}
                              </Text>
                          </View>
                      ))
                    : ""}
            </View>
        </View>
    );
};

export default OrderMesssage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF7A00",
        padding: 10,
        alignItems: "center",
        borderRadius: 20,

    },
    orderDetail: {
        // flexDirection: "row",
    },
    body_container: {
        // flexDirection: "row",
    },
    body_font: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 14,
    },
});

const order = {
    __v: 0,
    _id: "63f5f02d2e18f9d495d2d757",
    address: "",
    cart: [
        {
            amount: 1,
            food: [Object],
            id: 1,
            moreDetail: null,
            options: [Array],
            price: 110,
        },
        {
            amount: 1,
            food: [Object],
            id: 2,
            moreDetail: "ไม่ใส่ผัก",
            options: [Array],
            price: 90,
        },
    ],
    createdAt: "2023-02-22T10:36:29.590Z",
    customerId: "63f46d5f0ee8a09a91096666",
    restaurantId: "63f46de10ee8a09a91096673",
    status: "new",
    updatedAt: "2023-02-22T10:36:29.590Z",
};
