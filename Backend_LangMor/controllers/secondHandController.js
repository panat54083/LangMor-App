const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const SecondHand = mongoose.model("SecondHand");

exports.createSecondHand = async (req, res) => {
    const secondHandData = req.body;
    const secondHand = new SecondHand({
        name: secondHandData.name,
        detail: secondHandData.detail,
        price: secondHandData.price,
        picture: secondHandData.picture,
        owner_id: secondHandData.owner_id,
    });
    await secondHand.save();
    res.json({
        message: "Created Second Hand done...",
    });
};

exports.getMySecondHandsPosts = async (req, res) => {
    const { owner_id } = req.query;
    const secondHands = await SecondHand.find({ owner_id: owner_id, closed: false });
    res.json({
        message: "Get Second Hands done...",
        listSecondHands: secondHands,
    });
};
