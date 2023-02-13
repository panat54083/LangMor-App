import { Text, Pressable, StyleSheet } from "react-native";

const Logout = ({ onPress }) => {
    return (
        <Pressable style={[styles.container, styles.shadow]} onPress={onPress}>
            <Text style={styles.text}>Log Out</Text>
        </Pressable>
    );
};

export default Logout;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        borderRadius: 20,
        marginHorizontal: 20,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 30,

        textAlign: "center",
        color: "white",
    },
});
