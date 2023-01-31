import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";

const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ alignItems: "center" }}>
                <Image
                    source={require("../assets/images/Icon_LangMor.png")}
                    style={{ width: 275, height: 250 }}
                />
            </View>
            <Text style={{margin:20, fontSize: 30, fontFamily: "Kanit-Bold"}}>Login Your Account</Text>
        </SafeAreaView>
    );
};

export default LoginScreen;
