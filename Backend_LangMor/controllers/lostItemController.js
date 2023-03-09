const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const LostItem = mongoose.model("LostItem");

exports.createLostItem = async (req, res) => {
    const lostItemData = req.body;
    const lostItem = new LostItem({
        name: lostItemData.name,
        detail: lostItemData.detail,
        type: lostItemData.type,
        picture: lostItemData.picture,
        owner_id: lostItemData.owner_id,
    });
    await lostItem.save();
    res.json({
        message: "Created Lost Item done...",
    });
};

exports.getMyLostItemsPosts = async (req, res) => {
    const { owner_id } = req.query;
    const lostItems = await LostItem.find({
        owner_id: owner_id,
        closed: false,
    });

    res.json({
        message: "Get Lost Items done...",
        listOfLostItems: lostItems,
    });
};

exports.getAllLostItems = async (req, res) => {
    const { type, owner_id } = req.query;
    console.log(owner_id)
    if (type === "find" || type === "found") {
        if (owner_id) {
            const lostItems = await LostItem.find({
                type: type,
                owner_id: { $nin: [owner_id] },
            });
            res.json({
                message: `Get All ${type} Lost items without Owner one done...`,
                listOfLostItems: lostItems,
            });
        } else {
            const lostItems = await LostItem.find({ type: type });
            res.json({
                message: `Get All ${type} Lost items done...`,
                listOfLostItems: lostItems,
            });
        }
    } else {
        const lostItems = await LostItem.find({});
        res.json({
            message: "Get All Lost items done...",
            listOfLostItems: lostItems,
        });
    }
};
