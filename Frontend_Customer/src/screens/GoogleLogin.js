import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import * as WebBrowser from "expo-web-browser";
import UserContext from "../../hooks/context/UserContext";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
    const [accessToken, setAccessToken] = useState();
    const { onAction } = useContext(UserContext);
    // console.log(ANDROID_CLIENT_ID,IOS_CLIENT_ID,EXPO_CLIENT_ID);
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

    return (
        <View style={styles.container}>
            <Button
                title={"Login"}
                onPress={() => {
                    promptAsync({
                        useProxy: false,
                        showInRecents: true,
                    });
                }}
            />
        </View>
    );
};

export default GoogleLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    userInfo: {
        alignItems: "center",
        justifyContent: "center",
    },
    profilePic: {
        width: 50,
        height: 50,
    },
});
