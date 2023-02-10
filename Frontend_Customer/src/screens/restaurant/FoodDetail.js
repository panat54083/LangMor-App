import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import FoodDetailHeader from "../../components/headers/FoodDetailHeader";
import RadioSetBtn from "../../components/buttons/RadioSetBtn";
import CheckBoxSetBtn from "../../components/buttons/CheckBoxSetBtn";

const FoodDetail = ({ route, navigation }) => {
    const { food } = route.params;
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const foodOption = [
        {
            name: "ความหวาน",
            option: [
                { optName: "หวานน้อย", increasePrice: 0 },
                { optName: "หวานมาก", increasePrice: 10 },
                { optName: "หวานปกติ", increasePrice: 20 },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความเผ็ด",
            option: [
                { optName: "เผ็ดน้อย", increasePrice: 0 },
                { optName: "เผ็ดมาก", increasePrice: 10 },
                { optName: "เผ็ดปกติ", increasePrice: 20 },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความร้อน",
            option: [
                { optName: "ร้อนน้อย", increasePrice: 0 },
                { optName: "ร้อนมาก", increasePrice: 10 },
                { optName: "ร้อนปกติ", increasePrice: 20 },
            ],
            requireFill: false,
            IsRadio: true,
        },
        {
            name: "ความเปรี้ยว",
            option: [
                { optName: "เปรี้ยวน้อย", increasePrice: 0 },
                { optName: "เปรี้ยวมาก", increasePrice: 10 },
                { optName: "เปรี้ยวปกติ", increasePrice: 20 },
            ],
            requireFill: false,
            IsRadio: true,
        },
        {
            name: "ความขม",
            option: [
                { optName: "ขมน้อย", increasePrice: 0 },
                { optName: "ขมมาก", increasePrice: 10 },
                { optName: "ขมปกติ", increasePrice: 20 },
            ],
            requireFill: true,
            IsRadio: false,
        },
    ];
    const [confirmOption, setConfirmOption] = useState(() => {
        let array = [];
        foodOption.forEach((option) => {
            if (option.requireFill) {
                array.push({
                    name: option.name,
                    needCheck: true,
                    value: null,
                    increasePrice: 0,
                });
            } else {
                array.push({
                    name: option.name,
                    needCheck: false,
                    value: null,
                    increasePrice: 0,
                });
            }
        });
        return array;
    });

    const handlerOnRadioChangeVal = (data) => {
        const index = confirmOption.findIndex((option) => {
            return option.name === data.name;
        });

        setConfirmOption((prevValue) => {
            const newArr = [...prevValue];
            if (index !== -1 && data.value) {
                newArr[index] = {
                    name: newArr[index].name,
                    needCheck: false,
                    value: data.value,
                    increasePrice: data.price,
                };
            }
            return newArr;
        });
    };

    const handlerOnCheckBoxChangeVal = (data) => {
        const index = confirmOption.findIndex((option) => {
            return option.name === data.name;
        });

        setConfirmOption((prevValue) => {
            const newArr = [...prevValue];
            if (index !== -1 && data.value.length !== 0) {
                newArr[index] = {
                    name: newArr[index].name,
                    needCheck: false,
                    value: data.value,
                    increasePrice: data.price,
                };
            }
            return newArr;
        });
    };

    useEffect(() => {
        console.log(confirmOption);
    }, [confirmOption]);
    const handleOnPressConfirm = () => {
        console.log(confirmOption);
    };
    const handlerOnPressBack = () => {
        navigation.goBack();
    };
    return (
        <View style={{ flex: 1 }}>
            <FoodDetailHeader
                imgSrc={food.imgLink}
                handlerOnPressBack={handlerOnPressBack}
            />
            <View style={{ backgroundColor: "#FFFFFF" }}>
                <View style={{ marginLeft: "5.33%", marginTop: 14 }}>
                    <Text style={styles.foodNameText}>{food.name}</Text>
                    <View style={{ marginBottom: 11, marginTop: 10 }}>
                        <Text style={styles.detailText}>{food.detail}</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{ paddingBottom: 65 }}>
                    {/* Check this food have option */}
                    {foodOption.length !== 0
                        ? foodOption.map((option) => {
                              return (
                                  <View style={styles.cardRadioSet}>
                                      <View style={styles.optionNameContainer}>
                                          <Text style={styles.optionNameText}>
                                              {option.name}
                                          </Text>
                                      </View>
                                      <View
                                          style={styles.optionChoiceContainer}
                                      >
                                          {/* Check option is Radio or CheckBox */}
                                          {option.IsRadio ? (
                                              <RadioSetBtn
                                                  option={option}
                                                  handlerOnRadioChangeVal={
                                                      handlerOnRadioChangeVal
                                                  }
                                              />
                                          ) : (
                                              <CheckBoxSetBtn
                                                  option={option}
                                                  handlerOnCheckBoxChangeVal={
                                                      handlerOnCheckBoxChangeVal
                                                  }
                                              />
                                          )}
                                      </View>
                                  </View>
                              );
                          })
                        : null}
                </View>
            </ScrollView>
            <View style={styles.addItemBtn}>
                <Button
                    title="เพิ่มลงในตะกร้า"
                    onPress={handleOnPressConfirm}
                />
            </View>
        </View>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({
    detailText: {
        fontSize: 14,
        fontFamily: "Kanit-Bold",
        color: "#9D9693",
    },
    foodNameText: {
        fontSize: 22,
        fontFamily: "Kanit-Bold",
    },
    addItemBtn: {
        width: "89.33%",
        height: 46,
        marginBottom: 20,
        position: "absolute",
        alignSelf: "center",
        bottom: 0,
    },
    cardRadioSet: {
        marginTop: 8,
        backgroundColor: "#FFFFFF",
    },
    optionNameContainer: {
        marginLeft: "6%",
        marginTop: 10,
        marginBottom: 5,
    },
    optionNameText: {
        fontFamily: "Kanit-Bold",
        fontSize: 14,
    },
    optionChoiceContainer: {
        width: "80%",
        alignSelf: "center",
        paddingBottom: 12,
    },
});
