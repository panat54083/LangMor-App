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
