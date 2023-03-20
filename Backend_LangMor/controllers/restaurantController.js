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
            restaurantData: restaurant,
        });
    } else {
        const updatedRestaurant = {
            ...restaurantExists.toObject(),
            ...restaurantData,
        };
        await restaurantExists.updateOne(updatedRestaurant);
        res.json({
            message: "Restaurant existed. ❌",
            restaurantData: restaurantExists,
        });
    }
};

exports.registerAsWorker = async (req, res) => {
    const { worker_id, restaurant_id } = req.body;

    const restaurantData = await Restaurant.findById(restaurant_id);
    restaurantData.worker = [...restaurantData.worker, worker_id];
    const workerData = await Merchant.findById(worker_id);
    workerData.restaurant = restaurantData._id;
    await restaurantData.save();
    await workerData.save();

    res.json({
        message: "Register done..",
        restaurantData: restaurantData,
        userData: workerData,
    });
};

exports.restaurantUpdate = async (req, res) => {
    const { restaurant_id, updated_data } = req.body;
    const restaurantData = await Restaurant.findByIdAndUpdate(
        { _id: restaurant_id },
        updated_data,
        { new: true }
    );
    // console.log(restaurantData);
    res.json({
        message: "Restaurant Information is Updated!",
        restaurantData: restaurantData,
    });
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
    const restaurantDatas = await Restaurant.find({ closed: false });
    console.log(restaurantDatas);
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
    const { optionsData, option_id, restaurant_id } = req.body;
    // console.log(optionsData);
    if (option_id) {
        const optionsExist = await Option.findById(option_id);
        const { name, required, maximum, choices } = optionsData;
        optionsExist.name = name;
        optionsExist.required = required;
        optionsExist.maximum = maximum;
        optionsExist.choices = choices;
        await optionsExist.save();
        const foods = await Food.find({
            restaurant_id: restaurant_id,
            "options._id": option_id,
        });

        //Change options in food
        await Promise.all(
            foods.map(async (food, index) => {
                food.options = food.options.map((option, index) => {
                    if (String(option._id) === option_id) {
                        return optionsExist;
                    } else {
                        return option;
                    }
                });

                await food.save();
            })
        );
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

exports.restaurantOptionsDelete = async (req, res) => {
    const { option_id, restaurant_id } = req.body;
    const foods = await Food.find({
        restaurant_id: restaurant_id,
        "options._id": option_id,
    });

    console.log(foods);
    await Promise.all(
        foods.map(async (food, index) => {
            food.options = food.options.filter(
                (option) => String(option._id) !== option_id
            );
            await food.save();
        })
    );

    // await Promise.all(
    //     foods.map(async (food, index) => {
    //         food.options = food.options.map((option, index) => {
    //             if (String(option._id) !== option_id) {
    //                 return option;
    //             }
    //         });
    //         await food.save();
    //     })
    // );

    const del_option = await Option.findByIdAndDelete(option_id);

    res.json({
        message: `Delete ${del_option.name} options of the restaurant!!`,
    });
};

exports.restaurantTypesSave = async (req, res) => {
    const { types, restaurant_id } = req.body;
    const restaurant = await Restaurant.findById(restaurant_id);
    restaurant.types = types;
    await restaurant.save();
    //Check if type in food doesn't existed
    const foods = await Food.find({ restaurant_id: restaurant_id });
    await Promise.all(
        foods.map(async (food, index) => {
            if (!restaurant.types.includes(food.type)) {
                food.type = "";
                await food.save();
            }
        })
    );
    res.json({
        message: `Save Types for ${restaurant.name}`,
    });
};

exports.restaurantTypesDelete = async (req, res) => {
    const { type, restaurant_id } = req.body;
    const restaurant = await Restaurant.findById(restaurant_id);
    let types = restaurant.types.filter((o_type) => o_type !== type);
    restaurant.types = types;
    await restaurant.save();

    res.json({
        message: `Remove ${type} type for ${restaurant.name}`,
        types: restaurant.types,
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
    const { foodData, food_id } = req.body;

    if (!food_id) {
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
        const foodExist = await Food.findById(food_id);
        const updatedFood = { ...foodExist.toObject(), ...foodData };
        await foodExist.updateOne(updatedFood);
        res.json({
            message: `Update Food successfully`,
        });
    }
};

exports.restaurantFoodDelete = async (req, res) => {
    const { food_id } = req.body;
    const food = await Food.findByIdAndDelete(food_id);
    res.json({
        message: `Food ${food.name} delete done..`,
    });
};

exports.restaurantFoodsInfo = async (req, res) => {
    const { restaurant_id } = req.query;
    const foodsData = await Food.find({ restaurant_id: restaurant_id });
    res.json({
        message: `Get All Foods`,
        foodsData: foodsData,
    });
};
exports.foodsSearch = async (req, res) => {
    const { restaurant_id, keyword } = req.query;
    const foodsData = await Food.find({
        name: { $regex: `${keyword}`, $options: "i" },
        restaurant_id: restaurant_id,
    });
    res.json({
        message: `Get Foods`,
        foodsData: foodsData,
    });
};
exports.restaurantSearch = async (req, res) => {
    const { keyword } = req.query;
    Restaurant.aggregate([
        {
            $lookup: {
                from: "foods",
                localField: "_id",
                foreignField: "restaurant_id",
                as: "foods",
            },
        },
        {
            $match: {
                $or: [
                    { "foods.name": { $regex: `${keyword}`, $options: "i" } },
                    { name: { $regex: `${keyword}`, $options: "i" } },
                ],
            },
        },
    ]).exec((err, resResults) => {
        if (err) {
            // handle error
        } else {
            // remove the `food` array from the `resResults` documents
            const results = resResults.map((res) => {
                const { foods, ...rest } = res; // destructuring to remove `food`
                return rest;
            });
            // console.log(results);
            res.json({
                message: `Get Results`,
                results: results,
            });
        }
    });
};

exports.restaurantSearchMerchant = async (req, res) => {
    const { keyword } = req.query;
    console.log(keyword);
    const restaurants = await Restaurant.find({
        name: { $regex: `${keyword}`, $options: "i" },
    });
    res.json({
        message: `Get Restaurants`,
        restaurantsData: restaurants,
    });
};

exports.getFavRestaurants = async (req, res) => {
    const { idList } = req.query;

    const restaurants = await Restaurant.find({ _id: { $in: idList } });
    res.json({
        message: `Get Restaurants`,
        restaurantsData: restaurants,
    });
};

exports.randomRestaurants = async (req, res) => {
    const { number } = req.query;
    Restaurant.aggregate([
        { $match: { closed: false } },
        { $sample: { size: Number(number) } },
    ])
        .then((restaurants) => {
            console.log(restaurants);
            res.json({
                message: `Get Restaurants`,
                restaurantsData: restaurants,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
};
