import {
    View,
    Text,
    Image,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
} from "react-native";
import React from "react";
import GoogleLogin from "../components/buttons/GoogleLogin";

const Login= () => {
    const image = require("../assets/images/backgrounds/Login.png");
    // put Google login's function here
    const loginWithGoogle = () => {
        console.log("Button pressed");
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={require("../assets/icons/LangMor.png")}
                        style={{ width: 280, height: 250 }}
                    />
                </View>
                <Text style={styles.text}>Login{"\n"}Your Account</Text>
                <View style={{ margin: 20 }}>
                    <GoogleLogin onPress={loginWithGoogle} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        fontSize: 30,
        fontFamily: "Kanit-Bold",
    },
});
