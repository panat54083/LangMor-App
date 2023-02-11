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

        const merchant = await Merchant.findById(restaurant.owner);
        merchant.restaurant = restaurant._id;
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
    const { restaurant_id } = req.query;
    const restaurantData = await Restaurant.findById(restaurant_id);
    res.json({
        message: "Get Restaurant Information!",
        restaurantData: restaurantData,
    });
};

exports.restaurantClosed = async (req, res) => {
    const { restaurant_id } = req.body;
    const restaurant = await Restaurant.findById(restaurant_id)
    restaurant.closed = !restaurant.closed
    await restaurant.save() 

    res.json({
        message: `${restaurant.name} is ${restaurant.closed ? "Closed.😦" : "Opened.😃"}`
    })
}

exports.restaurantOptionsSave = async (req, res) => {
    const {options} = req.body;
    console.log(options)

    res.json({
        message: `Got Options`
    })
}