import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Fav from "../buttons/Fav";
const HomeHeader = (props) => {
    const { user } = props;
    // console.log(user);
    return (
        <View
            style={{
                flexDirection: "row",
                borderBottomRightRadius: 13,
                borderBottomLeftRadius: 13,
                flex: 1,
                position:"absolute",
                paddingBottom:"25%",

            }}
        >
            <View style={{ flex: 0.65, marginTop: "3%" }}>
                <View
                    style={{
                        marginLeft: "10%",
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
                            color: "white",
                        }}
                    >
                        {user.given_name}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 0.35,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "red",
                }}
            >
                <Image
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        borderWidth: 0.4,
                        borderColor: "black",
                        marginBottom: "16%",
                        overlayColor: "#FF7A00",
                    }}
                    source={{
                        uri: `${user.picture ? user.picture : loadingGif}`,
                    }}
                />
                {/* <Fav /> */}
            </View>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({});
