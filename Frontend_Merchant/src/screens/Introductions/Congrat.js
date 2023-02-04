// Packages
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
// Components
import { StyleSheet, Text, View, Image } from "react-native";
import AcceptButton from "../../components/buttons/AcceptButton";
// Configs
import UserContext from "../../hooks/context/UserContext";
import {IP_ADDRESS} from "@env"

const Congrat = () => {
    const {state, onAction} = useContext(UserContext)
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
    const handleSubmit = () => {
        fetchUserInfo(state.token)
        console.log("😃: Pressed!! ")
    }
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/icons/happy-face.png")}
                style={styles.image}
            />
            <View style={styles.text_container}>

            <Text style={[styles.text, {color: "#FF4200", marginBottom:20}]}>
                ยินดีด้วย
            </Text>
            <Text style={styles.text}>
                คุณได้เปิดร้านกับ {"\n"}Lang Mor App แล้ว
            </Text>
            </View>
            <View style={styles.submit}>
                <AcceptButton label={"จัดการร้าน"} onPress={handleSubmit}/>
            </View>
        </View>
    );
};

export default Congrat;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex:1,
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300,
        marginTop: "15%",
    },
    text_container:{
        marginBottom: 50,
    },
    text:{
        fontFamily: "Kanit-Bold",
        fontSize: 30,
        textAlign:"left"
        
    },
    submit:{
        justifyContent:"center",
        
        
    }
});
