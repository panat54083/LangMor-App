import {
    View,
    Text,
    Image,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import GoogleLogin from "../components/buttons/GoogleLogin";
import * as Google from "expo-auth-session/providers/google";
import {
    ANDROID_CLIENT_ID,
    IOS_CLIENT_ID,
    EXPO_CLIENT_ID,
    IP_ADDRESS,
} from "@env";
import * as WebBrowser from "expo-web-browser";
import UserContext from "../hooks/context/UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    // Check Token if it exists or not
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("Token"); // get token from local storage
                // check if there is token
                if (token) {
                    fetchUserInfo(token)
                    console.log("🔑: There is the token..");
                } else {
                    console.log("🚫: There is no the token..");
                }
            } catch (err) {
                console.log("CheckToken : " + err);
            }
        };
        checkToken(); // Call the function
    }, []);
    // Check Google response
    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
        if (accessToken) {
            fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }).then((googleUserData) => {
                googleUserData.json().then((data) => {
                    fetchLogin(data);
                });
            });
        }
    }, [response, accessToken]);
    //handle with google login
    const loginWithGoogle = () => {
        promptAsync({
            useProxy: false,
            showInRecents: true,
        });
    };
    //send Google user's data to Backend server
    const fetchLogin = (userData) => {
        axios
            .post(`http://${IP_ADDRESS}/user/login`, userData)
            .then(async (res) => {
                // console.log("Fetch Login: ", res.data.message);
                // console.log("Token: ", res.data.token);
                try {
                    await AsyncStorage.setItem("Token", res.data.token);
                } catch (e) {
                    console.log("AsyncStorage Error: ", e);
                }
                onAction.signIn({
                    user: res.data.userData,
                    token: res.data.token,
                });
            })
            .catch((err) => {
                console.log("Fetch Login: ", err.response.data);
            });
    };
    //get user information by token 
    const fetchUserInfo = (token) => {
        axios
            .get(`http://${IP_ADDRESS}/user/info`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                onAction.signIn({
                    user: res.data.userData,
                    token: token
                })
            })
            .catch((err) => {
                console.log("fetch UserInfo: ", err);
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
