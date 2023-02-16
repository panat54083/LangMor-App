const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Customer",
        },
        merchantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Merchant",
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