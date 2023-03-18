//Packages
import React from "react";
//Components
import { StyleSheet, Text, View,FlatList,ActivityIndicator } from "react-native";
import CardMarket from "../CardMarket";

const FavRestaurants = ({ restaurantsData, onPressCardMarket }) => {
    
    return (
        <View>
            {restaurantsData ? (
                <View>
                    <FlatList
                        data={restaurantsData}
                        renderItem={({ item }) => (
                            <View style={{ marginHorizontal: "3%", }}>
                                <CardMarket
                                    restaurant={item}
                                    onPressCard={onPressCardMarket}
                                />
                            </View>
                        )}
                    />
                </View>
            ) : (
                <View>
                    <ActivityIndicator size="large" color="#FF7A00" />
                </View>
            )}
        </View>
    );
};

export default FavRestaurants;

const styles = StyleSheet.create({});
