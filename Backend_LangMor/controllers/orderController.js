const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Restaurant = mongoose.model("Restaurant");
const Customer = mongoose.model("Customer");
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

exports.getOrder = async (req, res) => {
    const { customer_id, restaurant_id, status } = req.query;
    if (restaurant_id) {
        const data = [];
        const orders = await Order.find({
            restaurantId: restaurant_id,
            status: status,
        });
        const metaOrders = await Promise.all(
            orders.map(async (order, index) => {
                const customer = await Customer.findById(order.customerId);
                const tamp_data = { order: order, customer: customer };
                return [...data, tamp_data];
            })
        );
        res.json({
            message: "Get all Restaurant's orders",
            orders: metaOrders[0],
        });
    } else if (customer_id) {
        const data = [];
        const orders = await Order.find({
            customerId: customer_id,
            status: { $nin: ["close", "cancel"] },
        });
        const metaOrders = await Promise.all(
            orders.map(async (order, index) => {
                const restaurant = await Restaurant.findById(
                    order.restaurantId
                );
                const tamp_data = { order: order, restaurant: restaurant };
                return [...data, tamp_data];
            })
        );
        res.json({
            message: "Get all Customer's orders",
            orders: metaOrders[0],
        });
    }
};

exports.updateOrder = async (req, res) => {
    const { order_id, status } = req.body;
    const order = await Order.findById(order_id);
    if (order) {
        order.status = status;
        await order.save();
        res.json({
            orderData: order,
            message: "update order done..",
        });
    }else{
        res.json({
            message: "can't find order.."
        })
    }
};
