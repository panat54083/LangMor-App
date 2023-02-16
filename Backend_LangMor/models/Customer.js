const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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
        verified_email: {
            type: Boolean,
            required: true,
        },
        address: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customer", customerSchema);
