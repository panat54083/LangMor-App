const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const userData = req.body;
    // console.log(userData)
    const userExists = await Customer.findOne({
        email: userData.email,
    });
    if (!userExists) {
        const user = new Customer({
            email: userData.email,
            name: userData.name,
            given_name: userData.given_name,
            family_name: userData.family_name,
            picture: userData.picture,
            verified_email: userData.verified_email,
        });
        await user.save();
        //create token
        const token = jwt.sign({ id: user.id }, process.env.SECRET);

        res.json({
            message: `User [${userData.name}] registered successfully.✅`,
            token: token,
            userData: user,
        });
    } else {
        const token = jwt.sign({ id: userExists.id }, process.env.SECRET);

        res.json({
            message: "User existed.",
            token: token,
            userData: userExists,
        });
    }
};

exports.userInfo = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await Customer.findById(decoded.id);

        res.json({
            userData: user
        });
    } catch (err) {

        res.status(401).json({ message: "Unauthorized" });
    }
};
