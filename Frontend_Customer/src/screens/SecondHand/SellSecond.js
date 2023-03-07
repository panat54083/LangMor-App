//Packages
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
//Components
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import AddButton from "../../components/buttons/AddButton";
import CardTwoSide from "../../components/cards/CardTwoSide";
//Configs
import UserContext from "../../hooks/context/UserContext";
import { IP_ADDRESS } from "@env";

const SellSecond = ({ navigation }) => {
    //Configs
    const { state } = useContext(UserContext);
    const isFocused = useIsFocused();
    //Variables
    const [listSecondHands, setListSecondHands] = useState([]);

    useEffect(() => {
        if (isFocused) {
            api_getMyPosts();
        }
    }, [isFocused]);
    const api_getMyPosts = () => {
        axios
            .get(
                `http://${IP_ADDRESS}/secondHand/getMyPosts?owner_id=${state.userData._id}`
            )
            .then((res) => {
                console.log(res.data.message);
                setListSecondHands(res.data.listSecondHands);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddSecond = () => {
        navigation.navigate("AddSecond");
    };

    const handleItem = () => {
        console.log("Item");
    };

    const handleContact = () => {
        console.log("Contact");
    };

    const handleDebugger = () => {
        navigation.navigate("ChatTabs", {screen:"ChatSecondHand"})
    };

    return (
        <ScrollView style={styles.scrollView_container}>
            {/* <Button title="Debugger" onPress={handleDebugger} /> */}
            <View style={styles.add_container}>
                <AddButton onPress={handleAddSecond} />
            </View>
            <View style={{ marginHorizontal: 16 }}>
                {listSecondHands.map((item, index) => (
                    <CardTwoSide
                        key={index}
                        label={item.name}
                        numberOfContact={0}
                        onPressLeft={handleItem}
                        onPressRight={handleContact}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default SellSecond;

const styles = StyleSheet.create({
    scrollView_container: {
        flex: 1,
    },
    add_container: {
        marginHorizontal: 15,
    },
});
