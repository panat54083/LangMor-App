//Packages
import React, { useEffect, useState } from "react";
//Components
import { StyleSheet, Text, View, Button } from "react-native";
import Choices from "../Inputs/Choices";
const AddOptionsChoices = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (
            options.filter((option) => option.name === "").length < 1 ||
            options.length < 1
        ) {
            addNewOptions();
            console.log("🟢add Blank Element");
        } else if (options.filter((option) => option.name === "").length > 1) {
            removeDuplicateOption()
            console.log("🔴remove ");
        }

        console.log(options);
    }, [options]);

    const removeDuplicateOption= () => {
        let key = "name";
        let value = "";

        let filteredArr = options.reduce(function (acc, obj, index) {
            if (
                obj[key] === value &&
                acc.findIndex((x) => x[key] === value) === -1
            ) {
                acc.push(obj);
            } else if (obj[key] !== value) {
                acc.push(obj);
            }
            return acc;
        }, []);

        setOptions(filteredArr)
    };

    const addNewOptions = () => {
        setOptions([...options, { name: "", method: "increase", price: 0 }]);
    };

    const updateOptions = (option, index) => {
        const newOptions = options.map((item, i) => {
            if (index === i) {
                return option;
            } else {
                return item;
            }
        });

        setOptions(newOptions);
    };

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <Choices
                    key={index}
                    name={option.name}
                    price={option.price}
                    setName={(name) =>
                        updateOptions({ ...option, name: name }, index)
                    }
                    setPrice={(price) =>
                        updateOptions({ ...option, price: price }, index)
                    }
                    setMethod={(method) =>
                        updateOptions({ ...option, method: method }, index)
                    }
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
