const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Merchant = mongoose.model("Merchant");
const Option = mongoose.model("Option");
const Food = mongoose.model("Food");

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
            restaurantData: restaurant
        });
    } else {
        res.json({
            message: "Restaurant existed. ❌",
            restaurantData: restaurantExists
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

exports.getAllRestaurant = async (req, res) => {
    const restaurantDatas = await Restaurant.find({})
    res.json({
        message: "Get All Restaurant",
        restaurantData: restaurantDatas,
    });
};

exports.restaurantClosed = async (req, res) => {
    const { restaurant_id } = req.body;
    const restaurant = await Restaurant.findById(restaurant_id);
    restaurant.closed = !restaurant.closed;
    await restaurant.save();

    res.json({
        message: `${restaurant.name} is ${
            restaurant.closed ? "Closed.😦" : "Opened.😃"
        }`,
    });
};

exports.restaurantOptionsSave = async (req, res) => {
    const optionsData = req.body;
    // console.log(optionsData);
    const optionsExist = await Option.findOne({
        restaurant_id: optionsData.restaurant_id,
        name: optionsData.name,
    });
    if (optionsExist) {
        const { name, required, maximum, choices } = optionsData;
        optionsExist.name = name;
        optionsExist.required = required;
        optionsExist.maximum = maximum;
        optionsExist.choices = choices;
        await optionsExist.save();
        res.json({
            message: `Update Options ${optionsExist.name}`,
        });
    } else {
        const options = new Option({
            restaurant_id: optionsData.restaurant_id,
            name: optionsData.name,
            required: optionsData.required,
            maximum: optionsData.maximum,
            choices: optionsData.choices,
        });
        await options.save();
        res.json({
            message: `Save Options ${options.name}`,
        });
    }
};

exports.restaurantOptionsInfo = async (req, res) => {
    const { restaurant_id } = req.query;
    const optionsData = await Option.find({ restaurant_id: restaurant_id });
    res.json({
        message: "Get options of the restaurant!!",
        options: optionsData,
    });
};

exports.restaurantTypesSave = async (req, res) => {
    const { types, restaurant_id } = req.body;
    const restaurant = await Restaurant.findById(restaurant_id);
    restaurant.types = types;
    await restaurant.save();

    res.json({
        message: `Save Types for ${restaurant.name}`,
    });
};

exports.restaurantTypesInfo = async (req, res) => {
    const { restaurant_id } = req.query;
    // console.log( restaurant_id)
    const restaurant = await Restaurant.findById(restaurant_id);
    const types = restaurant.types;
    res.json({
        message: `Get All Types`,
        types: types,
    });
};

exports.restaurantFoodSave = async (req, res) => {
    const foodData = req.body;
    const foodExist = await Food.findOne({
        name: foodData.name,
    });
    if (!foodExist) {
        const food = new Food({
            restaurant_id: foodData.restaurant_id,
            name: foodData.name,
            price: foodData.price,
            description: foodData.description,
            type: foodData.type,
            options: foodData.options,
            picture: foodData.picture,
        });
        await food.save();
        res.json({
            message: `Save Food successfully`,
        });
    } else {
        res.json({
            message: `Save Food Error`,
        });
    }
};

exports.restaurantFoodsInfo = async (req, res) => {
    const { restaurant_id } = req.query;
    const foodsData = await Food.find({ restaurant_id: restaurant_id });
    res.json({
        message: `Get All Foods`,
        foodsData: foodsData,
    });
};
