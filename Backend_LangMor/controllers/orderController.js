const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.saveOrder = async (req, res) => {
    const orderData = req.body;
    console.log(orderData);
    res.json({
        message: "Order is saved 🍔",
    });
};
