import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
    /*
    Example calling: 
    import * as LIP from ....
    image = await LIP.pickImage() 
    */
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
        const image = result.assets[0];
        return image;
    }
};

export const openCamera = async () => {
    // Ask the user for the permission to access the camera
    // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    // if (permissionResult.granted === false) {
    //     alert("You've refused to allow this appp to access your camera!");
    //     return;
    // }

    const result = await ImagePicker.launchCameraAsync({
        base64: true,
        quality: 0.5,
    });

    if (!result.canceled) {
        const image = result.assets[0];
        return image;
    }
};
