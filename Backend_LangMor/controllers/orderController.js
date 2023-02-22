const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.saveOrder = async (req, res) => {
    const orderData = req.body;
    const existOrder = await Order.findOne({
        customerId: orderData.customerId,
        restaurantId: orderData.restaurantId,
    });
    if (!existOrder || existOrder.status === "done") {
        const order = new Order({
            customerId: orderData.customerId,
            restaurantId: orderData.restaurantId,
            cart: orderData.cart,
            address: orderData.address,
        });
        await order.save();
        res.json({
            message: "Order is saved 🍔",
            orderData: order,
        });
    } else {
        res.json({
            message: "Order is pending. 🚫",
            orderData: existOrder,
        });
    }
};

exports.getOrder = async(req, res) => {
    const {customer_id, restaurant_id} = req.query
    res.json({
        message: "Get all orders"
    })
}
