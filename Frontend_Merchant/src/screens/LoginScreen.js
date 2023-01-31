import { View, Text, Image, SafeAreaView, ImageBackground } from "react-native";
import React from "react";
import Btn_GoogleLogin from "../components/Btn_GoogleLogin";

const LoginScreen = () => {
    const image = require("../assets/images/backgrounds/Login.png");
    // const image = { uri: "https://reactjs.org/logo-og.png" };
    const loginWithGoogle = () => {
        console.log("Button pressed");
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                // justifyContent: "center",
                // margin: 20,
                backgroundColor: "#F5F5F5",
            }}
        >
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={require("../assets/icons/LangMor.png")}
                        style={{ width: 270, height: 251.3 }}
                    />
                </View>
                <Text
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        fontSize: 30,
                        fontFamily: "Kanit-Bold",
                    }}
                >
                    Login{"\n"}Your Account
                </Text>
                <Btn_GoogleLogin onPress={loginWithGoogle} />
            </ImageBackground>
        </SafeAreaView>
    );
};

export default LoginScreen;
