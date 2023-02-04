const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");

exports.register = async (req, res) =>{
    const restaurantData = req.body;
    const restaurantExists = await Restaurant.findOne({
        owner: restaurantData.owner,
    })
    if (!restaurantExists) {
        const restaurant = new Restaurant({
            name: restaurantData.name,
            owner: restaurantData.owner,
            phone: restaurantData.phone,
            picture: restaurantData.picture,
            address: restaurantData.address,
        })
        // console.log(restaurant)
        await restaurant.save()
    res.json({
        message: "Restaurant registerd successfully. ✅",

    })
    } else{
        res.json({
            message: "Restaurant existed. ❌"
        })
    }

}