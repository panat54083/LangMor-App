//Packages
import React, { useEffect, useState } from "react";
//Components
import { StyleSheet, Text, View, Button } from "react-native";
import Choices from "../Inputs/Choices";
const AddOptionsChoices = ({ inititalChoices, getChoices }) => {
    const [choices, setChoices] = useState(inititalChoices);

    useEffect(() => {
        if (
            choices.filter((choice) => choice.name === "").length < 1 ||
            choices.length < 1
        ) {
            addNewOptions();
        } else if (choices.filter((choice) => choice.name === "").length > 1) {
            removeDuplicateOption();
        }
        sendToMain();
    }, [choices]);

    const removeDuplicateOption = () => {
        let key = "name";
        let value = "";

        let filteredArr = choices.reduce(function (acc, obj, index) {
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
        setChoices(filteredArr);
    };

    const addNewOptions = () => {
        setChoices([...choices, { name: "", method: "increase", price: 0 }]);
    };

    const updateOptions = (choice, index) => {
        const newChoices = choices.map((item, i) => {
            if (index === i) {
                return choice;
            } else {
                return item;
            }
        });
        setChoices(newChoices);
    };
    const sendToMain = () => {
        const newChoices = choices.filter((item, index) => {
            return item.name !== "";
        });
        getChoices(newChoices);
    };
    return (
        <View style={styles.container}>
            {choices.map((choice, index) => (
                <View key={index}>
                    <Choices
                        name={choice.name}
                        price={choice.price}
                        setName={(name) =>
                            updateOptions({ ...choice, name: name }, index)
                        }
                        setPrice={(price) =>
                            updateOptions({ ...choice, price: price }, index)
                        }
                        setMethod={(method) =>
                            updateOptions({ ...choice, method: method }, index)
                        }
                    />
                </View>
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
