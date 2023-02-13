// Packages
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
// Components
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ImageBackground,
    StyleSheet,
} from "react-native";
import GoogleLogin from "../components/buttons/GoogleLogin";
// Configs
import {
    ANDROID_CLIENT_ID,
    IOS_CLIENT_ID,
    EXPO_CLIENT_ID,
    IP_ADDRESS,
} from "@env";
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const image = require("../assets/images/backgrounds/Login.png");
    const [accessToken, setAccessToken] = useState();
    const { state, onAction } = useContext(UserContext);
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
                const token = await AsyncStorage.getItem("M_Token"); // get token from local storage
                // check if there is token
                if (token) {
                    console.log("🔑: There is the token..");
                    fetchUserInfo(token);
                    // await setupSocket(token);
                } else {
                    console.log("🚫: There is no the token..");
                }
            } catch (err) {
                console.log("CheckToken : " + err);
            }
        };
        checkToken(); // Call the function
    }, []);
    //setup Socket if There is userData
    useEffect(() => {
        if (state.userData) {
            setupSocket(state.token);
        }
    }, [state.userData]);
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
            .post(`http://${IP_ADDRESS}/merchant/login`, userData)
            .then(async (res) => {
                // console.log("Fetch Login: ", res.data.message);
                // console.log("Token: ", res.data.token);
                try {
                    await AsyncStorage.setItem("M_Token", res.data.token);
                } catch (e) {
                    console.log("AsyncStorage Error: ", e);
                }
                onAction.signIn({
                    user: res.data.userData,
                    token: res.data.token,
                });
                // await setupSocket(res.data.token);
            })
            .catch((err) => {
                console.log("Fetch Login: ", err.response.data);
            });
    };
    //get user information by token
    const fetchUserInfo = (token) => {
        axios
            .get(`http://${IP_ADDRESS}/merchant/info`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                onAction.signIn({
                    user: res.data.userData,
                    token: token,
                });
            })
            .catch((err) => {
                console.log("fetch UserInfo: ", err);
            });
    };
    //Setup Socket
    const setupSocket = async (token) => {
        const newSocket = io(`http://${IP_ADDRESS}`, {
            query: {
                token: token,
            },
        });
        //deal with connect event
        newSocket.on("connect", () => {
            console.log(`   ▶ Socket Connect [${newSocket.id}]`);
            setSocket(newSocket);
        });
        // disconnect event
        newSocket.on("disconnect", () => {
            console.log("   ▶ Socket Disconnect!");
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
