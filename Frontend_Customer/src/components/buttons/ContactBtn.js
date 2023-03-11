import React from "react";
import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

const BUTTONS_PER_ROW = 2;

const ContactBtn = (props) => {
    const { chatroom, onPress } = props;
    const pic =
        "https://www.nicepng.com/png/detail/302-3026464_png-file-svg-login-member-icon-png.png";

    // return <View style={styles.container}>{rows}</View>;
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <View>
                <Image
                    source={{ uri: chatroom.customer.picture }}
                    style={styles.imgStyle}
                />
            </View>
            <View style={{ maxWidth: "85%" }}>
                <Text style={styles.textNameStyle}>
                    {chatroom.customer.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "88%",
    },
    row: {
        flexDirection: "row",
        // backgroundColor: "blue",
        // width: "90%",
        justifyContent: "space-between",
    },
    buttonContainer: {
        // marginHorizontal: "1%",
        marginVertical: "1%",
        paddingTop: "3%",
        paddingBottom: "4%",
        backgroundColor: "#FF7A00",
        width: "47%",
        alignItems: "center",
        borderRadius: 15,
    },
    imgStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 0.6,
        borderColor: "black",
        marginBottom: "8%",
    },
    textNameStyle: {
        textAlign: "center",
        fontFamily: "Kanit-Bold",
        fontSize: 18,
        color: "white",
    },
});

export default ContactBtn;
