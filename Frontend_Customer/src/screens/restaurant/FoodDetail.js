import { ScrollView, StyleSheet, Text, View } from "react-native";
import BasketContext from "../../hooks/context/BasketContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import FoodDetailHeader from "../../components/headers/FoodDetailHeader";
import RadioSetBtn from "../../components/buttons/RadioSetBtn";
import CheckBoxSetBtn from "../../components/buttons/CheckBoxSetBtn";
import MoreDetailCard from "../../components/cards/MoreDetailCard";
import SubmitBtn from "../../components/buttons/SubmitBtn";

const FoodDetail = ({ route, navigation }) => {
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    const { food, restaurant, editOrder } = route.params;
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const [number, setNumber] = useState(editOrder ? editOrder.amount : 1);
    const [moreDetail, setMoreDetail] = useState(null);
    const [price, setPrice] = useState(
        editOrder ? editOrder.price : food.price
    );

    const findOldOptionsVal = (optionName) => {
        const index = editOrder.options.findIndex((option) => {
            return option.name === optionName;
        });
        return editOrder.options[index].value;
    };
    const findOldOptionsPrice = (optionName) => {
        const index = editOrder.options.findIndex((option) => {
            return option.name === optionName;
        });
        return editOrder.options[index].price;
    };
    const foodOption = [
        {
            name: "ความหวาน",
            option: [
                { optName: "หวานน้อย", price: 0 },
                { optName: "หวานมาก", price: 10 },
                { optName: "หวานปกติ", price: 20 },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความเผ็ด",
            option: [
                { optName: "เผ็ดน้อย", price: 0 },
                { optName: "เผ็ดมาก", price: 10 },
                { optName: "เผ็ดปกติ", price: 20 },
            ],
            requireFill: true,
            IsRadio: true,
        },
        {
            name: "ความร้อน",
            option: [
                { optName: "ร้อนน้อย", price: 0 },
                { optName: "ร้อนมาก", price: 10 },
                { optName: "ร้อนปกติ", price: 20 },
            ],
            requireFill: false,
            IsRadio: true,
        },
        {
            name: "ความเปรี้ยว",
            option: [
                { optName: "เปรี้ยวน้อย", price: 0 },
                { optName: "เปรี้ยวมาก", price: 10 },
                { optName: "เปรี้ยวปกติ", price: 20 },
            ],
            requireFill: false,
            IsRadio: false,
        },
        {
            name: "ความขม",
            option: [
                { optName: "ขมน้อย", price: 0 },
                { optName: "ขมมาก", price: 10 },
                { optName: "ขมปกติ", price: 20 },
            ],
            requireFill: true,
            IsRadio: false,
        },
    ];
    const [confirmOption, setConfirmOption] = useState(() => {
        if (editOrder) {
            return editOrder.options;
        } else {
            // console.log('HElo');
            let array = [];
            food.options.forEach((option) => {
                if (option.required) {
                    array.push({
                        name: option.name,
                        required: true,
                        value: null,
                        price: 0,
                    });
                } else {
                    array.push({
                        name: option.name,
                        required: false,
                        value: null,
                        price: 0,
                    });
                }
            });
            return array;
        }
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
                    required: false,
                    value: data.value,
                    price: data.price,
                };
                setPrice((prevPrice) => {
                    return prevPrice + data.price - prevValue[index].price;
                });
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
            if (index !== -1) {
                newArr[index] = {
                    name: newArr[index].name,
                    // ตรงนี้ต้อง Check ตามจำนวนที่ Required มาอีกที😒😒
                    required: false,
                    value: data.value,
                    price: data.price,
                };
                if (prevValue[index].price.length > data.price.length) {
                    setPrice((prevPrice) => {
                        const diffValue = prevValue[index].value.filter(
                            (x) => !data.value.includes(x)
                        )[0];
                        const indexOfPrice =
                            prevValue[index].value.indexOf(diffValue);
                        if (indexOfPrice !== -1) {
                            return (
                                prevPrice - prevValue[index].price[indexOfPrice]
                            );
                        }
                    });
                } else if (prevValue[index].price.length < data.price.length) {
                    setPrice((prevPrice) => {
                        const diffValue = data.value.filter(
                            (x) => !prevValue[index].value.includes(x)
                        )[0];
                        const indexOfPrice = data.value.indexOf(diffValue);
                        if (indexOfPrice !== -1) {
                            return prevPrice + data.price[indexOfPrice];
                        }
                    });
                }
            }

            return newArr;
        });
    };

    // useEffect(() => {
    //     console.log(confirmOption);
    // }, [confirmOption]);

    // useEffect(() => {
    //     console.log(basketDetail);
    // }, [basketDetail]);
    const handleOnPressSubmit = () => {
        if (editOrder) {
            setBasketDetail((prevDetail) => {
                const newDetail = { ...prevDetail };
                const foodData = {
                    id: editOrder.id,
                    food: food,
                    options: confirmOption,
                    moreDetail: moreDetail,
                    amount: number,
                    price: price,
                };
                newDetail.restaurant = restaurant;
                newDetail.foods[editOrder.id - 1] = foodData;
                return newDetail;
            });
        } else {
            setBasketDetail((prevDetail) => {
                const newDetail = { ...prevDetail };
                const foodData = {
                    id: prevDetail.foods.length + 1,
                    food: food,
                    options: confirmOption,
                    moreDetail: moreDetail,
                    amount: number,
                    price: price,
                };
                newDetail.restaurant = restaurant;
                newDetail.foods.push(foodData);
                return newDetail;
            });
        }

        navigation.goBack();
    };

    const handlerOnPressBack = () => {
        navigation.goBack();
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <FoodDetailHeader
                imgSrc={food.picture ? `${food.picture.url}` : null}
                handlerOnPressBack={handlerOnPressBack}
            />
            <View style={{ backgroundColor: "#FFFFFF", flexDirection: "row" }}>
                <View style={{ marginLeft: "5.33%", marginTop: 14 }}>
                    <Text style={styles.foodNameText}>{food.name}</Text>
                    <View style={{ marginBottom: 11, marginTop: 10 }}>
                        <Text style={styles.detailText}>{food.detail}</Text>
                    </View>
                </View>

                <Text style={styles.foodPrice}>{price * number} B.</Text>
            </View>

            <ScrollView>
                <View
                    style={{
                        paddingBottom: 80,
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    {/* Check this food have option */}
                    {food.options.length !== 0
                        ? food.options.map((option) => {
                              return (
                                  <View
                                      style={styles.cardRadioSet}
                                      key={option.name}
                                  >
                                      <View
                                          style={{
                                              height: 7,
                                              backgroundColor: "#DFDFDF",
                                          }}
                                      ></View>
                                      <View style={styles.optionNameContainer}>
                                          <Text style={styles.optionNameText}>
                                              {option.name}
                                          </Text>
                                      </View>
                                      <View
                                          style={styles.optionChoiceContainer}
                                      >
                                          {/* Check option is Radio or CheckBox */}
                                          {option.required &&
                                          option.maximum === 1 ? (
                                              <RadioSetBtn
                                                  option={option}
                                                  handlerOnRadioChangeVal={
                                                      handlerOnRadioChangeVal
                                                  }
                                                  seleValue={
                                                      editOrder
                                                          ? findOldOptionsVal(
                                                                option.name
                                                            )
                                                          : null
                                                  }
                                                  selePrice={
                                                      editOrder
                                                          ? findOldOptionsPrice(
                                                                option.name
                                                            )
                                                          : null
                                                  }
                                              />
                                          ) : (
                                              <CheckBoxSetBtn
                                                  option={option}
                                                  handlerOnCheckBoxChangeVal={
                                                      handlerOnCheckBoxChangeVal
                                                  }
                                                  seleValue={
                                                      editOrder
                                                          ? findOldOptionsVal(
                                                                option.name
                                                            )
                                                          : null
                                                  }
                                                  selePrice={
                                                      editOrder
                                                          ? findOldOptionsPrice(
                                                                option.name
                                                            )
                                                          : null
                                                  }
                                              />
                                          )}
                                      </View>
                                  </View>
                              );
                          })
                        : null}
                    <View
                        style={{
                            height: 7,
                            backgroundColor: "#DFDFDF",
                        }}
                    ></View>
                    <MoreDetailCard
                        number={number}
                        setNumber={setNumber}
                        moreDetail={moreDetail}
                        setMoreDetail={setMoreDetail}
                    />
                </View>
            </ScrollView>

            <View style={styles.addItemBtn}>
                <SubmitBtn
                    label={editOrder ? "อัปเดต" : "เพิ่มลงตะกล้า"}
                    onPress={handleOnPressSubmit}
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

        alignSelf: "center",
        bottom: 0,
    },
    cardRadioSet: {
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
    foodPrice: {
        marginLeft: "auto",
        alignSelf: "center",
        marginRight: "5.33%",
        color: "#FF7A00",
        fontSize: 20,
        fontFamily: "Kanit-Bold",
    },
});
