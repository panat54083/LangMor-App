const mongoose = require("mongoose");
const secondHandSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
    },
    price: {
        type: Number,
        require: true,
    },
    picture: {
        type: mongoose.Schema.Types.Mixed,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    closed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("SecondHand", secondHandSchema);
