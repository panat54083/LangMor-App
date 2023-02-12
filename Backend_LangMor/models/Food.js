const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema(
    {
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        description:{
            type: String,
        },
        type:{
            type: String,
        },
        options:{
            type: []
        },
        picture:{
            type: mongoose.Schema.Types.Mixed
        }

    }
)

module.exports = mongoose.model("Food", foodSchema)