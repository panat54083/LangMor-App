import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Fav from "../buttons/Fav";
const HomeHeader = (props) => {
    const { user } = props;
    console.log(user);
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.65 }}>
                <View
                    style={{
                        marginLeft: "6%",
                        justifyContent: "space-evenly",
                        flex: 1,
                    }}
                >
                    <Text style={{ fontFamily: "Kanit-Bold", fontSize: 32 }}>
                        สวัสดีคุณ
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Kanit-Bold",
                            fontSize: 32,
                        }}
                    >
                        {user.name}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 0.35,
                    alignItems: "center",
                    // backgroundColor: "red",
                    justifyContent: "center",
                }}
            >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        borderWidth: 0.4,
                        borderColor: "black",
                        marginBottom: "16%",
                    }}
                    source={{
                        uri: `${user.picture ? user.picture : loadingGif}`,
                    }}
                />

                <Fav />
            </View>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({});
