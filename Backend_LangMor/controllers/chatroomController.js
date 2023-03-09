const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model("Message");
const Customer = mongoose.model("Customer");
const Restaurant = mongoose.model("Restaurant");
const SecondHand = mongoose.model("SecondHand");
const LostItem = mongoose.model("LostItem");

exports.createChatroom = async (req, res) => {
    const { customerId, merchantId, type, itemId } = req.body;
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
    const { customerId, merchantId, type } = req.query;
    if (customerId) {
        const chatrooms = await Chatroom.find({
            customerId: customerId,
            type: type,
            closed: false,
        });

        const extraChatrooms = await Promise.all(
            chatrooms.map(async (room, index) => {
                const merchant = await Customer.findById(room.merchantId);
                if (room.type === "SecondHand") {
                    const secondHand = await SecondHand.findById(room.itemId);
                    const tamp_data = {
                        chatroom: room,
                        merchant: merchant,
                        itemData: secondHand,
                    };
                    return tamp_data;
                } else if (room.type === "LostItem") {
                    const lostItem = await LostItem.findById(room.itemId);
                    const tamp_data = {
                        chatroom: room,
                        merchant: merchant,
                        itemData: lostItem,
                    };
                    return tamp_data;
                }
            })
        );
        res.json({
            message: `Get All Chatroom [Customer] ${type}`,
            chatrooms: extraChatrooms,
        });
    } else if (merchantId) {
        const chatrooms = await Chatroom.find({
            merchantId: merchantId,
            type: type,
            closed: false,
        });
        const extraChatrooms = await Promise.all(
            chatrooms.map(async (room, index) => {
                const customer = await Customer.findById(room.customerId);
                const tamp_data = { chatroom: room, customer: customer };
                return tamp_data;
            })
        );
        res.json({
            message: "Get All Chatroom [Merchant]",
            chatrooms: extraChatrooms,
        });
    } else {
        res.json({
            message: "Error maybe wrong Query String",
            chatroom: null,
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
