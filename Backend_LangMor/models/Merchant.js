const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: "Email is required!",
        },
        name: {
            type: String,
            required: "Name is required!",
        },
        given_name: {
            type: String,
            required: "Given name is required!",
        },
        family_name: {
            type: String,
            required: "Family name is required!",
        },
        picture: {
            type: String,
        },
        restaurant: {
            type:   mongoose.Schema.Types.ObjectId, 
            default: null,
        },
        verified_email: {
            type: Boolean,
            required: "Family name is required!",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Merchant", merchantSchema);