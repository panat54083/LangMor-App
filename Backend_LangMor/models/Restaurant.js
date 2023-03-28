const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        worker: {
            type: [],
            default: null,
        },
        picture: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
        address: {
            type: String,
        },
        closed: {
            type: Boolean,
            default: true,
        },
        types: {
            type: [],
            defualt: [],
        },
        description: {
            type: String,
            defulat: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
