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
import * as ImagePicker from "expo-image-picker";

const ImageInput = ({ lable, image, setImage }) => {
    const [visible, setVisible] = useState(false);
    const handleImageInput = () => {
        console.log("Select Options.");
        setVisible(!visible);
    };
    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    function handleSelectPicture() {
        pickImage();
        setVisible(!visible);
    }
    function handleOpenCamera() {
        openCamera();
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
                            <View style={{ marginBottom: 20 }}>
                                <FontAwesome5
                                    name="plus"
                                    size={80}
                                    color="#FF7A00"
                                />
                            </View>
                            <Text style={styles.text}>{lable}</Text>
                        </Pressable>
                    ) : (
                        <View>
                            <Image
                                source={{
                                    uri: `data:${image.type}/jpg;base64,${image.base64}`,
                                }}
                                style={styles.container}
                            />
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
