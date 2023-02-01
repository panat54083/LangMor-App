import { View, Text, TextInput, Pressable } from "react-native";

const Logout = ({ onPress }) => {
    return (
        <Pressable
            style={{
                backgroundColor: "red",
                borderRadius: 20,
                marginHorizontal: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontFamily: "Kanit-Bold",
                    fontSize: 30,

                    textAlign: "center",
                    color: "white",
                }}
            >
                Log Out
            </Text>
        </Pressable>
    );
};

export default Logout;
