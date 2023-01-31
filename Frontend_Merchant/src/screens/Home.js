import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import Large from "../components/buttons/Large";

const Home = () => {
    const surname = "Panat";
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 20 }}>
                <Text style={[styles.textHeader, {color: "#FF4200"}]}>สวัสดี</Text>
                <Text style={styles.textHeader}>คุณ {surname}</Text>
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
