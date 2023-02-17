const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model("Message");


exports.createChatroom = async (req, res) => {
    const { customerId, restaurantId } = req.body;
    const chatroomExist = await Chatroom.findOne({
        customerId: customerId,
        restaurantId: restaurantId,
        closed: false,
    });
    if (!chatroomExist) {
        const chatroom = new Chatroom({
            customerId: customerId,
            restaurantId: restaurantId,
        });
        await chatroom.save();

        res.json({
            chatroomData: chatroom,
            message: "Chatroom is created!",
        });
    }
};

exports.closeChatroom = async (req, res) => {
    const { chatroomId } = req.body;
    const closeRoom = await Chatroom.findById(chatroomId);
    closeRoom.closed = true;
    await closeRoom.save();
    res.json({
        message: "Chatroom is closed!",
    });
};

exports.getChatrooms = async (req, res) => {
    const { customerId, restaurantId } = req.query;

    if (customerId) {
        const chatrooms = await Chatroom.find({
            customerId: customerId,
            closed: false,
        });
        res.json({
            message: "Get All Chatroom",
            chatrooms: chatrooms,
        });
    } else if (restaurantId) {
        const chatrooms = await Chatroom.find({
            restaurantId: restaurantId,
            closed: false,
        });
        res.json({
            message: "Get All Chatroom",
            chatrooms: chatrooms,
        });
    }
};

exports.getMessages = async (req, res) => {
    const {chatroomId} = req.query
    const messages = await Message.find({chatroom: chatroomId})
    res.json({
        messages : messages,
    })
}