const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        merchantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        type:{
            type: String,
            enum: ["LostItem", "SecondHand"]
        },
        closed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timeseries: true,
    }
);

module.exports = mongoose.model("Chatroom", chatroomSchema)