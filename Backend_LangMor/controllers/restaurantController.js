const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

exports.register = async (req, res) =>{
    const restaurantData = req.body;
    console.log(restaurantData)

    res.json({
        message: "Restaurant registerd successfully!!"
    })
}