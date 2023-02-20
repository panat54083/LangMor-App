import * as ImagePicker from "expo-image-picker";
import { CLOUD_DINARY_API } from "@env";

export const pickImage = async () => {
    /*
    Example calling: 
    import * as LIP from ....
    1. image = await LIP.pickImage() 
    2. LIP.pickImage().then((data)=>{
dd
        }).catch((err)=>{ })
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

export const openCamera = async (ownerId) => {
    const result = await ImagePicker.launchCameraAsync({
        base64: true,
        quality: 0.5,
    });

    if (!result.canceled) {
        const image = result.assets[0];
        return image;
    }
};

export const handleUpload= async (image, ownerId) => {
    /*Example
            LIP.handleUpload(banner, restaurantData._id)
            .then((data) => {
            })
            .catch((err) => {
            });
     */
    let base64Img = `data:${image.type}/jpg;base64,${image.base64}`;
    let apiUrl = CLOUD_DINARY_API;
    let data = {
        file: base64Img,
        upload_preset: "LangMorApp",
        folder: `/LangMorApp/${ownerId}/`,
    };
    return fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
    })
        .then(async (response) => {
            let data = await response.json();
            if (data.secure_url) {
                // console.log(data);
                return data
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const dummy = {
    access_mode: "public",
    asset_id: "7c923841792d3cd294ef8149a74cac59",
    bytes: 25044,
    created_at: "2023-02-17T17:49:09Z",
    etag: "693927115e283af4ab180666cac63bd9",
    folder: "",
    format: "jpg",
    height: 637,
    placeholder: false,
    public_id: "gdbdjwu6ksix1kcstbq5",
    resource_type: "image",
    secure_url:
        "https://res.cloudinary.com/dzakkk7rf/image/upload/v1676656149/gdbdjwu6ksix1kcstbq5.jpg",
    signature: "003416c616ea00e0974514ae3c81da157ee67d9f",
    tags: [],
    type: "upload",
    url: "http://res.cloudinary.com/dzakkk7rf/image/upload/v1676656149/gdbdjwu6ksix1kcstbq5.jpg",
    version: 1676656149,
    version_id: "2d5cb81313c5096e487a9c6b9ddeba37",
    width: 481,
};

const old_image = {
    assetId: "59",
    base64: "iO7Pfs4AAAAASUVORK5CYII=",
    duration: null,
    exif: null,
    height: 94,
    rotation: null,
    type: "image",
    uri: "file:///data/user/0/com.kmutnb.frontendlangmormerchant/cache/ImagePicker/6c8ed224-01b2-4409-82df-cf6efa45d692.png",
    width: 93,
};
