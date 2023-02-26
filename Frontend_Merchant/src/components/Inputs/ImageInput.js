import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5, Feather, AntDesign, Entypo } from "@expo/vector-icons";
import * as LIP from "../../lib/lm-image-picker";
const ImageInput = ({ label, image, setImage }) => {
    const [visible, setVisible] = useState(false);
    const handleImageInput = () => {
        setVisible(!visible);
    };

    async function handleSelectPicture() {
        setImage(await LIP.pickImage());
        setVisible(!visible);
    }
    async function handleOpenCamera() {
        setImage(await LIP.openCamera());
        setVisible(!visible);
    }
    function handleClosedImage() {
        setImage(null);
    }

    return (
        <View>
            {!visible ? (
                <View>
                    {image == null ? (
                        <Pressable
                            onPress={handleImageInput}
                            style={styles.container}
                        >
                            <View
                                style={{
                                    marginBottom: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <FontAwesome5
                                    name="plus"
                                    size={80}
                                    color="#FF7A00"
                                />
                                {label ? (
                                    <Text style={styles.text}>{label}</Text>
                                ) : (
                                    ""
                                )}
                            </View>
                        </Pressable>
                    ) : (
                        <View>
                            {image.type === "upload" ? (
                                <Image
                                    source={{
                                        uri: `${image.url}`,
                                    }}
                                    style={styles.container}
                                />
                            ) : (
                                <Image
                                    source={{
                                        uri: `data:${image.type}/jpg;base64,${image.base64}`,
                                    }}
                                    style={styles.container}
                                />
                            )}
                            <Pressable
                                onPress={handleClosedImage}
                                style={styles.cross}
                            >
                                <Entypo
                                    name="circle-with-cross"
                                    size={24}
                                    color="#FF0101"
                                />
                            </Pressable>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={handleOpenCamera}
                        style={styles.options}
                    >
                        <Feather name="camera" size={24} color="#FF7A00" />
                        <Text style={[styles.text, { marginLeft: "10%" }]}>
                            เปิดกล้อง
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSelectPicture}
                        style={styles.options}
                    >
                        <AntDesign name="picture" size={24} color="#FF7A00" />
                        <Text style={[styles.text, { marginLeft: "10%" }]}>
                            เลือกรูป
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ImageInput;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 210,
        width: 280,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#C9C5C4",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    cross: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 40,
        alignSelf: "flex-end",
        margin: -8,
    },
    options: {
        // backgroundColor: "red",
        flexDirection: "row",
        marginHorizontal: "20%",
        marginVertical: "5%",
        // justifyContent:"center",
        alignItems: "baseline",
        // flex: 1,
        padding: 20,
    },
    text: {
        fontFamily: "Kanit-Bold",
        fontSize: 20,
    },
});
