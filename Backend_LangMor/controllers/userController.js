const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const userData = req.body;
    console.log(userData)
    const userExists = await User.findOne({
        email: userData.email,
    });
    if (!userExists) {
        const user = new User({
            email: userData.email,
            name: userData.name,
            given_name: userData.given_name,
            family_name: userData.family_name,
            picture: userData.picture,
            verified_email: userData.verified_email,
        });
        await user.save();
        res.json({
            message: "User logged in successfully.",
        });
    } else{
        res.json({
            message: "User existed."
        })
    }
};
