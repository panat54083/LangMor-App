//Packages
import React, { useEffect, useState } from "react";
//Components
import { StyleSheet, Text, View, Button } from "react-native";
import Choices from "../Inputs/Choices";
const AddOptionsChoices = () => {
    const [options, setOptions] = useState([
        { key: 0, name: "", method: "increase", price: 0 },
    ]);

    useEffect(() => {
        if (options.filter((option) => option.name === "").length < 1) {
            addNewOptions();
            console.log("🟢add Blank Element");
        } else if (options.filter((option) => option.name === "").length > 1) {
            // removeEmptyOptions();
            // removeLastOptions()
            // removeOneEmptyOptions();
            removeSomeOptions();
            // removeAnyOptions();
            console.log("🔴remove ");
        }

        console.log(options);
    }, [options]);

    const updateIndexOptions = (options) => {
        const updatedArray = options.map((item, index) => {
            return { ...item, key: index };
        });

        setOptions(updatedArray);
    };
    // const removeAnyOptions = () => {
    //     const unique2 = options.filter((obj, index) => {
    //         return index === options.findIndex((o) => obj.name === o.name);
    //     });
    //     setOptions(unique2);
    // };
    const removeSomeOptions = () => {
        const newArrayList = [];
        options.forEach((obj) => {
            if (!newArrayList.some((o) => o.name === obj.name)) {
                newArrayList.push({ ...obj });
            }
        });
        updateIndexOptions(newArrayList);
    };
    // const removeOneEmptyOptions = () => {
    //     const filteredOptions = options.filter((option) => option.name !== "");
    //     const emptyOptions = options.filter((option) => option.name === "");
    //     emptyOptions.splice(-1, 1);
    //     setOptions([...filteredOptions, ...emptyOptions]);
    // };
    // const removeLastOptions = () => {
    //     const newOptions = [...options];
    //     newOptions.splice(-1, 1);
    //     // newOptions.pop()
    //     setOptions(newOptions);
    // };
    // const removeEmptyOptions = () => {
    //     const filteredOptions = options.filter((option) => option.name !== "");
    //     setOptions(filteredOptions);
    // };

    const addNewOptions = () => {
        updateIndexOptions([
            ...options,
            {
                key: options.length + 1,
                name: "",
                method: "increase",
                price: 0,
            },
        ]);
        // setOptions([...options, { name: "", method: "increase", price: 0 }]);
    };

    const updateOptions = (option, index) => {
        const newOptions = options.map((item, i) => {
            if (index === i) {
                return { ...option, key: index };
            } else {
                return { ...item, key: i };
            }
        });

        setOptions(newOptions);
    };

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <Choices
                    key={index}
                    getChoice={(option) => updateOptions(option, index)}
                />
            ))}
        </View>
    );
};

export default AddOptionsChoices;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 10,
    },
    options: {
        marginBottom: 8,
    },
    addNewChoice: {
        fontSize: 16,
        color: "blue",
        marginTop: 10,
        textAlign: "center",
    },
});
