const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required!",
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required!",
    },
    message: {
        type: String,
        default: "",
    },
    picture: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    timestamp: {
        type: String,
        default: new Date(Date.now()).toString(),
    },
});

module.exports = mongoose.model("Message", messageSchema);
