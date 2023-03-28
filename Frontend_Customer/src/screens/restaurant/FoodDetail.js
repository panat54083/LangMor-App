//Packages
import uuid from "react-native-uuid";
import React, { useContext, useEffect, useMemo, useState } from "react";
//Components
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Button,
} from "react-native";
import FoodDetailHeader from "../../components/headers/FoodDetailHeader";
import RadioSetBtn from "../../components/buttons/RadioSetBtn";
import CheckBoxSetBtn from "../../components/buttons/CheckBoxSetBtn";
import MoreDetailCard from "../../components/cards/MoreDetailCard";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import AlertChangeRes from "../../components/cards/AlertChangeRes";
//Configs
import BasketContext from "../../hooks/context/BasketContext";

const FoodDetail = ({ route, navigation }) => {
    const { food, restaurant, editOrder } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const { basketDetail, setBasketDetail } = useContext(BasketContext);
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const [number, setNumber] = useState(editOrder ? editOrder.amount : 1);
    const [moreDetail, setMoreDetail] = useState(
        editOrder ? editOrder.moreDetail : null
    );
    const [price, setPrice] = useState(
        editOrder ? editOrder.price : food.price
    );
    const [requiredCheckList, setrequiredCheckList] = useState([]);

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

    const [confirmOption, setConfirmOption] = useState(() => {
        if (editOrder) {
            setrequiredCheckList(editOrder.requiredCheckList);
            return editOrder.options;
        } else {
            // console.log('HElo');
            let array = [];
            food.options.forEach((option) => {
                if (option.required) {
                    setrequiredCheckList((prev) => {
                        return [...prev, option.name];
                    });
                    array.push({
                        name: option.name,
                        required: true,
                        value: null,
                        price: 0,
                        maximum: option.maximum,
                    });
                } else {
                    array.push({
                        name: option.name,
                        required: false,
                        value: null,
                        price: 0,
                        maximum: option.maximum,
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
                    maximum: prevValue.maximum,
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
        // console.log(requiredCheckList);
        setConfirmOption((prevValue) => {
            const newArr = [...prevValue];
            if (index !== -1) {
                if (
                    data.value.length === 0 &&
                    requiredCheckList.includes(data.name) // ถ้าข้อมูลไม่ได้กรอก เเละ เป็นข้อมูลที่จำเป็นต้องใส่ => required: true
                ) {
                    newArr[index] = {
                        name: newArr[index].name,
                        maximum: prevValue.maximum,
                        required: true,
                        value: data.value,
                        price: data.price,
                    };
                } else {
                    newArr[index] = {
                        name: newArr[index].name,
                        required: false,
                        value: data.value,
                        price: data.price,
                    };
                }

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

    useEffect(() => {
        // console.log(confirmOption);
        const check = confirmOption.reduce(
            (accumulator, option) => accumulator || option.required,
            false
        );
        if (!check) {
            setIsAllInputsFilled(true);
        } else {
            setIsAllInputsFilled(false);
        }
    }, [confirmOption]);

    // useEffect(() => {
    //     console.log(basketDetail);
    // }, [basketDetail]);
    const handleOnPressSubmit = () => {
        if (
            basketDetail.restaurant === null ||
            basketDetail.restaurant.name === restaurant.name
        ) {
            if (editOrder) {
                setBasketDetail((prevDetail) => {
                    const newDetail = { ...prevDetail };
                    const index = newDetail.foods.findIndex((food) => {
                        return food.id === editOrder.id;
                    });
                    if (number !== 0) {
                        const foodData = {
                            id: editOrder.id,
                            food: food,
                            options: confirmOption,
                            moreDetail: moreDetail,
                            amount: number,
                            price: price,
                            requiredCheckList: requiredCheckList,
                        };
                        newDetail.restaurant = restaurant;
                        newDetail.foods[index] = foodData;
                        return newDetail;
                    } else {
                        newDetail.foods.splice(index, 1);
                        if (newDetail.foods.length === 0) {
                            newDetail.restaurant = null;
                        } else {
                            newDetail.restaurant = restaurant;
                        }
                        // console.log(newDetail.foods);
                        return newDetail;
                    }
                });
            } else {
                setBasketDetail((prevDetail) => {
                    const newDetail = { ...prevDetail };
                    const foodData = {
                        id: uuid.v4(),
                        food: food,
                        options: confirmOption,
                        moreDetail: moreDetail,
                        amount: number,
                        price: price,
                        requiredCheckList: requiredCheckList,
                    };
                    // console.log(foodData.id);
                    newDetail.restaurant = restaurant;
                    newDetail.foods.push(foodData);
                    return newDetail;
                });
            }

            navigation.goBack();
        } else {
            setModalVisible((prev) => !prev);
            return;
        }
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
            <View style={{ backgroundColor: "#FFFFFF", flexDirection: "row",  }}>
                <View style={{ marginLeft: "5.33%", marginTop: 14 }}>
                    <Text style={styles.foodNameText}>{food.name}</Text>
                    <View style={{ marginBottom: 11, marginTop: 10 ,}}>
                        <Text
                            style={styles.detailText}
                            adjustsFontSizeToFit={true}
                            numberOfLines={4}
                        >
                            {food.description}
                        </Text>
                    </View>
                </View>

                {/* <Text style={styles.foodPrice}>฿ {price * number} </Text> */}
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
                        ? food.options.map((option, index) => {
                              return (
                                  <View style={styles.cardRadioSet} key={index}>
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
                                          {requiredCheckList.includes(
                                              option.name
                                          ) ? (
                                              <Text
                                                  style={[styles.requiredMark]}
                                              >
                                                  {"  "}*
                                              </Text>
                                          ) : null}
                                          {!(
                                              option.required &&
                                              option.maximum === 1
                                          ) ? (
                                              <Text
                                                  style={
                                                      styles.subOptionNameText
                                                  }
                                              >
                                                  {"  "}
                                                  {option.maximum === 0
                                                      ? "(สามารถเลือกได้ทั้งหมด)"
                                                      : `(เลือกได้สูงสุด ${option.maximum} ช้อยส์)`}
                                              </Text>
                                          ) : null}
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
                                                  maximum={option.maximum}
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
                        minNumber={editOrder ? 0 : 1}
                        number={number}
                        setNumber={setNumber}
                        moreDetail={moreDetail}
                        setMoreDetail={setMoreDetail}
                    />
                </View>
            </ScrollView>

            {number !== 0 ? (
                <View style={styles.addItemBtn}>
                    <SubmitBtn
                        label={
                            editOrder
                                ? "อัปเดต"
                                : `เพิ่มลงตะกร้า | ฿ ${price * number}`
                        }
                        disable={!isAllInputsFilled}
                        onPress={handleOnPressSubmit}
                    />
                </View>
            ) : (
                <View style={styles.addItemBtn}>
                    <SubmitBtn
                        label={"ลบรายการ"}
                        disable={!isAllInputsFilled}
                        onPress={handleOnPressSubmit}
                        backgroundColor={"red"}
                    />
                </View>
            )}

            <AlertChangeRes
                modalVisible={modalVisible}
                toggleModalVisible={() => {
                    setModalVisible(!modalVisible);
                }}
                handleOnPressSubmit={handleOnPressSubmit}
            />
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
        backgroundColor: "#FFFFFF",
    },
    optionNameContainer: {
        marginLeft: "6%",
        marginTop: 10,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "baseline",
        // justifyContent: "space-between",
        // backgroundColor: "green",
    },
    optionNameText: {
        fontFamily: "Kanit-Bold",
        fontSize: 14,
    },
    subOptionNameText: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 10,
        // alignSelf: "flex-end",
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
    requiredMark: {
        fontFamily: "Kanit-SemiBold",
        fontSize: 14,
        color: "red",
        // alignSelf: "flex-end",
    },
});
