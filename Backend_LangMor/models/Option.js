const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    required: {
        type: Boolean,
        defualt: false,
    },
    maximum: {
        type: Number,
        defualt: 1,
    },
    choices: {
        type: Array,
    },
});

module.exports = mongoose.model("Option", optionSchema);
