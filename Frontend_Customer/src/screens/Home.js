import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useContext } from "react";
import UserContext from "../hooks/context/UserContext";

const Home = () => {
    const { state, onAction } = useContext(UserContext);
    return (
        <View>
            {state.userData ? (
                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Text>Hello</Text>
                    <Text>{state.userData.name}</Text>
                    <Text>{state.userData.email}</Text>
                    <Image
                        source={{ uri: state.userData.picture }}
                        style={styles.profilePic}
                    />
                    <Button
                        title={"LogOut"}
                        onPress={() => {
                            onAction.signOut();
                        }}
                    />
                </View>
            ) : (
                <View>
                    <Text>Dont have UserData</Text>
                </View>
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    profilePic: {
        width: 50,
        height: 50,
    },
});
