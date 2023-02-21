const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customerId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    restaurantId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Restaurant"
    },
    status: {
        type: String,
        default: "new",
        enum: ["new","doing","delivering","done"]
    },
    cart:{
        type: [],
        default: []
    }

},{
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)