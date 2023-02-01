import {
    View,
    Text,
    Image,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import GoogleLogin from "../components/buttons/GoogleLogin";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
import UserContext from "../hooks/context/UserContext";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    const image = require("../assets/images/backgrounds/Login.png");
    const [accessToken, setAccessToken] = useState();
    const { onAction } = useContext(UserContext);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
        if (accessToken) {
            fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }).then((googleUserData) => {
                googleUserData.json().then((data) => {
                    onAction.signIn({ user: data });
                });
            });
        }
    }, [response, accessToken]);

    const loginWithGoogle = () => {
        promptAsync({
            useProxy: false,
            showInRecents: true,
        });
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

export default LoginScreen;

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
