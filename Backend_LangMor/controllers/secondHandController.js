const mongoose = require("mongoose")
const Customer = mongoose.model("Customer")
const SecondHand = mongoose.model("SecondHand")

exports.createSecondHand = async (req, res) => {
    const secondHandData = req.body
    console.log(secondHandData)
    res.json({
        message: "Created Second Hand done..."
    })
}