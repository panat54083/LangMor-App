import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Button,
} from "react-native";
import { useContext } from "react";
import Large from "../components/buttons/Large";
import UserContext from "../hooks/context/UserContext";

const Home = () => {
    const { state, onAction } = useContext(UserContext);
    const handleLogout = () => {
        onAction.signOut();
    };

    return (
        <SafeAreaView style={styles.container}>
            {state.userData ? (
                <View>
                    <View style={{ margin: 20 }}>
                        <Text style={[styles.textHeader, { color: "#FF4200" }]}>
                            สวัสดี
                        </Text>
                        <Text style={styles.textHeader}>
                            คุณ {state.userData.given_name}
                        </Text>
                    </View>
                    <View style={{ margin: 20 }}>
                        <Large
                            name={"ตั้งร้านค้า"}
                            image={require("../assets/icons/restaurant.png")}
                        />
                        <Large
                            name={"เลือกเป็นสมาชิกร้าน"}
                            image={require("../assets/icons/waiter.png")}
                        />
                    </View>
                    <Button title="Log out" onPress={handleLogout} />
                </View>
            ) : (
                <View></View>
            )}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    textHeader: {
        fontFamily: "Kanit-Bold",
        fontSize: 38,
    },
});
