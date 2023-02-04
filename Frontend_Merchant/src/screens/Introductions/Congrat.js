import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AcceptButton from "../../components/buttons/AcceptButton";
const Congrat = () => {
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
                <AcceptButton label={"ไปยังหน้าถัดไป"}/>
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
