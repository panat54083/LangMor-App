import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    const [message, setMessage] = React.useState();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
    });

    React.useEffect(() => {
        setMessage(JSON.stringify(response));
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response]);

    async function getUserData() {
        let userInfoResponse = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        userInfoResponse.json().then((data) => {
            setUserInfo(data);
        });
    }

    function ShowUserInfo() {
        if (userInfo) {
            return (
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: userInfo.picture }}
                        style={styles.profilePic}
                    />
                    <Text>Welcome {userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            {ShowUserInfo()}
            <Button
                title={accessToken ? "Get User Data" : "Login"}
                onPress={
                    accessToken
                        ? getUserData
                        : () => {
                              promptAsync({
                                  useProxy: false,
                                  showInRecents: true,
                              });
                          }
                }
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
