import React from "react";
import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

const DATA = [
    { id: "1", title: "นายA" },
    { id: "2", title: "นายB" },
    { id: "3", title: "นายC" },
    { id: "4", title: "นายD" },
    { id: "5", title: "นายE" },
    { id: "6", title: "นายF" },
    { id: "7", title: "นายG" },
    { id: "8", title: "นายH" },
    { id: "9", title: "นายI" },
    { id: "10", title: "นายJ" },
    { id: "11", title: "นายK" },
    { id: "12", title: "นายL" },
    { id: "13", title: "นายM" },
    { id: "14", title: "นายN" },
    { id: "15", title: "นายO" },
];

const BUTTONS_PER_ROW = 2;

const ContactSet = (props) => {
    const { chatroomsData } = props;
    const pic =
        "https://www.nicepng.com/png/detail/302-3026464_png-file-svg-login-member-icon-png.png";
    const renderRow = (items) => (
        <View style={styles.row} key={items[0].chatroom._id}>
            {items.map((item) => (
                <TouchableOpacity
                    style={styles.buttonContainer}
                    key={item.chatroom._id}
                >
                    <View>
                        <Image
                            source={{ uri: item.customer.picture }}
                            style={styles.imgStyle}
                        />
                    </View>
                    <View style={{ maxWidth: "85%" }}>
                        <Text style={styles.textNameStyle}>
                            {item.customer.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    const rows = [];
    // ลูปใช้สำหรับขอ  
    // for (let i = 0; i < DATA.length; i += BUTTONS_PER_ROW) {
    //     const row = DATA.slice(i, i + BUTTONS_PER_ROW);
    //     rows.push(renderRow(row));
    // }

    for (let i = 0; i < chatroomsData.length; i += BUTTONS_PER_ROW) {
        const row = chatroomsData.slice(i, i + BUTTONS_PER_ROW);
        rows.push(renderRow(row));
    }

    return <View style={styles.container}>{rows}</View>;
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

export default ContactSet;
