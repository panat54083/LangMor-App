import React, { useState } from "react";
import {
    View,
    Modal,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Dropdown = ({ getValue }) => {
    const options = [
        { key: 0, label: "เพิ่ม", value: "increase" },
        { key: 1, label: "ลด", value: "decrease" },
    ];
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(options[0].value);
    const [label, setLabel] = useState(options[0].label);

    const handleOptionPress = (label, value) => {
        setLabel(label);
        getValue(value);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                nRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.container_options}
                >
                    <View style={styles.options}>
                        {options.map(({ key, label, value }) => (
                            <TouchableOpacity
                                style={styles.option}
                                key={key}
                                onPress={() => handleOptionPress(label, value)}
                            >
                                <Text style={styles.text}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    touchMain: {
        alignSelf: "stretch",
        alignItems: "center",
    },
    container_options: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    options: {
        backgroundColor: "white",
        borderRadius: 15,
        width: WIDTH - 100,
        // height: HEIGHT/2,
    },
    option: {
        // position:"absolute",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        fontFamily: "Kanit-Medium",
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
});
