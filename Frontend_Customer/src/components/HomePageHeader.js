import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../hooks/context/UserContext";
const HomePageHeader = () => {
    const { state } = useContext(UserContext);
    const loadingGif =
        "https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif";
    return (
        <View style={{ marginRight: "10%" }}>
            {state.userData ? (
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                    source={{
                        uri: `${
                            state.userData.picture
                                ? state.userData.picture
                                : loadingGif
                        }`,
                    }}
                />
            ) : (
                null
            )}
        </View>
    );
};

export default HomePageHeader;

const styles = StyleSheet.create({});
