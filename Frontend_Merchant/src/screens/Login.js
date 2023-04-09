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
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";
import GoogleLogin from "../components/buttons/GoogleLogin";
import EditTextInput from "../components/Inputs/CustomTextInput";
import AcceptButton from "../components/buttons/AcceptButton";
// Configs
import {
    ANDROID_CLIENT_ID,
    IOS_CLIENT_ID,
    EXPO_CLIENT_ID,
    API_URL,
} from "@env";
import UserContext from "../hooks/context/UserContext";
import SocketContext from "../hooks/context/SocketContext";

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
    const [accessToken, setAccessToken] = useState();
    const [isPressed, setIsPressed] = useState(false);
    const [testerName, setTesterName] = useState("");
    const [visible, setVisible] = useState(false);
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
                    fetchUserInfo(token)
                        .then(async (data) => {
                            if (data) {
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
    //setup Socket if There is userData
    // useEffect(() => {
    //     if (state.userData) {
    //         setupSocket(state.token);
    //     }
    // }, [state.userData]);
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
                    fetchLogin(data, "google");
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
    //send Google user's data to Backend server
    const fetchLogin = (userData, type) => {
        axios
            .post(
                type === "google"
                    ? `${API_URL}/merchant/login`
                    : `${API_URL}/merchant/logintester`,
                userData
            )
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
                await setupSocket(res.data.token);
            })
            .catch((err) => {
                console.log("Fetch Login: ", err);
            });
    };
    //get user information by token
    const fetchUserInfo = async (token) => {
        return axios
            .get(`${API_URL}/merchant/info`, {
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
            transports: ["websocket"],
            upgrade: false,
        });
        //deal with connect event
        newSocket.on("connect", () => {
            console.log(`   ▶   Socket Connect [${newSocket.id}]`);
            setSocket(newSocket);
        });
        // disconnect event
        newSocket.on("disconnect", () => {
            console.log("   ▶   Socket Disconnect!");
            setSocket(null);
        });
    };
    //handle with tester login
    const handlePressTesterLogin = () => {
        const body = { name: testerName };
        fetchLogin(body, "tester");
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
                <View
                    style={{
                        width: "90%",
                        alignSelf: "center",
                        marginBottom: "4%",
                    }}
                >
                    <GoogleLogin
                        // onPress={loginWithGoogle}
                        onPressIn={handlePressIn}
                        isPressed={isPressed}
                        onPressOut={handlePressOut}
                    />
                </View>
                <TouchableOpacity
                    style={{ alignSelf: "center", marginBottom: "2%" }}
                    onPress={() => {
                        setVisible(!visible);
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Kanit-Medium",
                            fontSize: 13,
                            color: "gray",
                            textDecorationLine: "underline",
                        }}
                    >
                        {visible ? `Hide Login as Tester` : `Login as Tester`}
                    </Text>
                </TouchableOpacity>
                {visible ? (
                    <View style={{ width: "80%", alignSelf: "center" }}>
                        <EditTextInput
                            placeholder={"Enter Your Tester Name"}
                            value={testerName}
                            onChangeText={(text) => setTesterName(text)}
                        />
                        <AcceptButton
                            label={"Login as Tester"}
                            onPress={handlePressTesterLogin}
                        />
                    </View>
                ) : null}
            </ImageBackground>
        </KeyboardAvoidingView>
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
