const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

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
