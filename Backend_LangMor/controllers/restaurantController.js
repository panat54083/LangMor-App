const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Merchant = mongoose.model("Merchant");

exports.register = async (req, res) => {
    const restaurantData = req.body;
    const restaurantExists = await Restaurant.findOne({
        owner: restaurantData.owner,
    });
    if (!restaurantExists) {
        const restaurant = new Restaurant({
            name: restaurantData.name,
            owner: restaurantData.owner,
            phone: restaurantData.phone,
            picture: restaurantData.picture,
            address: restaurantData.address,
        });
        await restaurant.save();

        const merchant = await Merchant.findById(restaurant.owner)
        merchant.restaurant = restaurant._id 
        await merchant.save();

        res.json({
            message: "Restaurant registerd successfully. ✅",
        });
    } else {
        res.json({
            message: "Restaurant existed. ❌",
        });
    }
};

exports.restaurantInfo = async (req, res) => {
        const {restaurant} = req.query
        // console.log(restaurant)
        const restaurantData = await Restaurant.findById(restaurant) 
        console.log(restaurantData)
        res.json({
            message: "Get Restaurant Information!",
            restaurantData: restaurantData,
        })
}

