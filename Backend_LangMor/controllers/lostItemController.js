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
