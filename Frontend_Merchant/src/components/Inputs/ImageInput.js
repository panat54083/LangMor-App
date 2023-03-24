//Packages
import React, { useState } from "react";
import ImageView from "react-native-image-viewing";
import * as LIP from "../../lib/lm-image-picker";
//Components
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    FontAwesome5,
    Feather,
    AntDesign,
    Entypo,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

const ImageInput = ({ label, image, setImage, disable = false }) => {
    const [visible, setVisible] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const handleImageInput = () => {
        if (!disable) {
            setVisible(!visible);
        }
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
                                {/* <FontAwesome5
                                    name="plus"
                                    size={80}
                                    color="#FF7A00"
                                /> */}
                                <MaterialCommunityIcons
                                    name="file-image-plus"
                                    size={80}
                                    color="#FF4200"
                                />
                                {label ? (
                                    <Text style={styles.text}>{label}</Text>
                                ) : (
                                    ""
                                )}
                            </View>
                        </Pressable>
                    ) : (
                        <Pressable onPress={() => setShowImage(true)}>
                            {image.type === "upload" ? (
                                <View>
                                    <Image
                                        source={{
                                            uri: `${image.url}`,
                                        }}
                                        style={styles.container}
                                    />
                                    <ImageView
                                        images={[{ uri: `${image.url}` }]}
                                        imageIndex={0}
                                        visible={showImage}
                                        onRequestClose={() =>
                                            setShowImage(false)
                                        }
                                    />
                                </View>
                            ) : (
                                <View>
                                    <Image
                                        source={{
                                            uri: `data:${image.type}/jpg;base64,${image.base64}`,
                                        }}
                                        style={styles.container}
                                    />
                                    <ImageView
                                        images={[
                                            {
                                                uri: `data:${image.type}/jpg;base64,${image.base64}`,
                                            },
                                        ]}
                                        imageIndex={0}
                                        visible={showImage}
                                        onRequestClose={() =>
                                            setShowImage(false)
                                        }
                                    />
                                </View>
                            )}
                            {!disable && (
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
                            )}
                        </Pressable>
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
