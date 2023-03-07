const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model("Message");
const Customer = mongoose.model("Customer");
const Restaurant = mongoose.model("Restaurant")

exports.createChatroom = async (req, res) => {
    const { customerId, merchantId, type, itemId} = req.body;
    const chatroomExist = await Chatroom.findOne({
        customerId: customerId,
        merchantId: merchantId,
        itemId: itemId,
        type: type,
        closed: false,
    });
    if (!chatroomExist) {
        const chatroom = new Chatroom({
            customerId: customerId,
            merchantId: merchantId,
            itemId: itemId,
            type: type,
        });
        await chatroom.save();

        res.json({
            chatroomData: chatroom,
            message: "Chatroom is created!",
        });
    } else {
        res.json({
            chatroomData: chatroomExist,
            message: "Chatroom is Existed!",
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
    const { customerId, merchantId, type} = req.query;

    if (customerId) {
        const data = []
        const chatrooms = await Chatroom.find({
            customerId: customerId,
            type: type,
            closed: false,
        });

        const extraChatrooms = await Promise.all(
            chatrooms.map(async (room, index) => {
                const merchant = await Customer.findById(room.merchantId);
                const tamp_data = { chatroom: room, merchant: merchant};
                return [...data, tamp_data];
            })
        );
        res.json({
            message: "Get All Chatroom",
            chatrooms: extraChatrooms[0],
        });

    } else if (merchantId) {
        const data = [];
        const chatrooms = await Chatroom.find({
            merchantId: merchantId,
            type: type,
            closed: false,
        });
        const extraChatrooms = await Promise.all(
            chatrooms.map(async (room, index) => {
                const customer = await Customer.findById(room.customerId);
                const tamp_data = { chatroom: room, customer: customer };
                return [...data, tamp_data];
            })
        );
        res.json({
            message: "Get All Chatroom",
            chatrooms: extraChatrooms[0],
        });
    }
};

exports.getMessages = async (req, res) => {
    const { chatroomId } = req.query;
    const messages = await Message.find({ chatroom: chatroomId });
    res.json({
        messages: messages,
    });
};
