import {
    View,
    Text,
    Image,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Button,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import GoogleLogin from "../components/buttons/GoogleLogin";
import * as Google from "expo-auth-session/providers/google";
import {
    ANDROID_CLIENT_ID,
    IOS_CLIENT_ID,
    EXPO_CLIENT_ID,
    API_URL,
} from "@env";
import * as WebBrowser from "expo-web-browser";
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
WebBrowser.maybeCompleteAuthSession();
const Login = () => {
    const image = require("../assets/images/backgrounds/Login.png");
    const [isPressed, setIsPressed] = useState(false);
    const [accessToken, setAccessToken] = useState();
    const { onAction } = useContext(UserContext);
    const { setSocket } = useContext(SocketContext);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
    });

    // Check Token if it exists or not
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("C_Token"); // get token from local storage
                // check if there is token
                if (token) {
                    console.log("🔑: There is the token..");
                    fetchUserInfo(token)
                        .then(async (data) => {
                            if (data) {
                                console.log("📶: Setting up Socket");
                                await setupSocket(token);
                            } else {
                                console.log("⛔: No User's Data");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
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
                    // console.log(data);
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
    const handlePress = debounce(() => {
        setIsPressed(false);
        loginWithGoogle();
    }, 300); // ปรับเวลา Delay ตรงนี้
    const handlePressIn = () => {
        setIsPressed(true);
    };
    const handlePressOut = () => {
        if (isPressed) {
            handlePress();
        }
    };
    // return () => clearTimeout(delayDebounceFn);
    //send Google user's data to Backend server
    const fetchLogin = (userData) => {
        axios
            .post(`${API_URL}/customer/login`, userData)
            .then(async (res) => {
                // console.log("Fetch Login: ", res.data.message);
                // console.log("Token: ", res.data.token);
                try {
                    await AsyncStorage.setItem("C_Token", res.data.token);
                } catch (e) {
                    console.log("AsyncStorage Error: ", e);
                }
                onAction.signIn({
                    user: res.data.userData,
                    token: res.data.token,
                });
                await setupSocket(res.data.token);
            })
            .catch((err) => {
                console.log("Fetch Login: ", err.response.data);
            });
    };
    //get customer information by token
    const fetchUserInfo = async (token) => {
        return axios
            .get(`${API_URL}/customer/info`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                if (res.data.userData) {
                    onAction.signIn({
                        user: res.data.userData,
                        token: token,
                    });
                    return res.data.userData;
                }
            })
            .catch((err) => {
                console.log("fetch UserInfo: ", err);
            });
    };
    //Setup Socket
    const setupSocket = async (token) => {
        const newSocket = io(`${API_URL}`, {
            query: {
                token: token,
            },
        });
        //deal with connect event
        newSocket.on("connect", () => {
            setSocket(newSocket);
            console.log(`   ▶   Socket Connect [${newSocket.id}]`);
        });
        // disconnect event
        newSocket.on("disconnect", () => {
            console.log("   ▶   Socket Disconnect!");
            setSocket(null);
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={{ alignItems: "center" , marginBottom: "5%"}}>
                    <Image
                        source={require("../assets/icons/LangMor.png")}
                        style={{ width: 280, height: 250 }}
                    />
                </View>
                {/* <Text style={[styles.text, {fontSize: 10}]}>Login{"\n"}Your Account</Text> */}
                <Text style={[styles.text, {fontSize: 20, fontFamily:"Kanit-Medium"}]}>Login Your Account</Text>
                <View style={{ marginHorizontal: 20 }}>
                    <GoogleLogin
                        // onPress={loginWithGoogle}
                        onPressIn={handlePressIn}
                        isPressed={isPressed}
                        onPressOut={handlePressOut}
                    />
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
