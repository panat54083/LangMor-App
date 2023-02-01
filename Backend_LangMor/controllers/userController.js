const mongoose = require("mongoose")
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")

exports.login = async (req, res) =>{
    const  userData = req.body;
    console.log(userData)
    // console.log(typeof(userData))
    // const objUserData= JSON.parse(userData)
    // console.log(typeof(objUserData))
    // const stringUserData= JSON.stringify(objUserData)
    // console.log(typeof(stringUserData))
    res.json({
        message: "User logged in successfully.",
    })
}