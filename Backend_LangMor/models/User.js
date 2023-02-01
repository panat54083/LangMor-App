const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
            required: "Family name is required!",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
