const mongoose = require("mongoose")
const lostItemSchema = new  mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    detail:{
        type: String,
    },
    type:{
        type: String,
        default: "find",
        enum: ["find", "found"]
    },
    picture:{
        type: mongoose.Schema.Types.Mixed,
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    closed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("LostItem", lostItemSchema)